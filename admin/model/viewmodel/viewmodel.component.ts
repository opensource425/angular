import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as THREE from 'three';
import * as $ from 'jquery';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../../environments/environment';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { WEBGL } from 'three/examples/jsm/WebGL.js'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-viewmodel',
  templateUrl: './viewmodel.component.html',
  styleUrls: ['./viewmodel.component.scss']
})
export class ViewmodelComponent implements OnInit {
  name = 'Imanual';
  private scene;
  private rgbLoader;
  private controls;
  private raycaster;
  private labelRenderer;     
  private mixer;
  private model;
  private camera;
  private renderer;
  private container;
  private envMap;
  private texture;
  private pmremGenerator;
  private progressBar;
  private renderPass; 
  private cam;
  private iniLoad
  private webEnable;
  private cameras
  private guiParams
  private modelDatum;
  private id;
  public xControl;
  public yControl;
  public zControl;   
  public xPosition;
  public yPosition;
  public zPosition;
  private xControlAnimation;
  private yControlAnimation;
  private zControlAnimation;

  constructor(private http: HttpClient,private route: ActivatedRoute, private router:Router,private toastr: ToastrService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.webEnable = true;
  

    // GET THE MODEL DETAILS
    this.id= this.route.snapshot.paramMap.get('id');
   
  
    if ( WEBGL.isWebGLAvailable() ) {
        this.renderer = new THREE.WebGLRenderer({
          antialias: true  //alpha: true 
              });  
    } else {
      const warning = WEBGL.getWebGLErrorMessage();
      document.body.appendChild( warning ); 
      this.webEnable = false;
    }
   this.renderer = new THREE.WebGLRenderer({
    antialias: true  //alpha: true 
        }); 
 
    this.cam = 0;
    this.labelRenderer;
    this.rgbLoader;
    this.mixer;
    this.model;
    this.container;
    this.texture;
    this.envMap;
    this.pmremGenerator;
    this.progressBar;
    this.scene = new THREE.Scene();
    this.raycaster = new THREE.Raycaster();
    this.camera = new THREE.PerspectiveCamera(34.5158770189817,2.8684210526315788,1,1000);    
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );   
    this.controls.enableZoom = true;
    this.controls.zoomSpeed = 1.2;
    this.renderPass; 
    this.iniLoad = true;
    this.cameras = []

    
   
  }
   
    async ngOnInit() {
      $('app-sidebar').toggle();
      $('cui-breadcrumb').toggle();
      $('app-footer').toggle();
      
      $( ".container-fluid" ).addClass( "model-view" );

      $("main").css({
        "margin-left": "0px"
      });
      $("app-footer").css({
        "margin-left": "0px"
      });

      this.modelDatum = await new Promise(resolve => this.http.get(environment["baseUrl"] + "model/main/"+this.id, { responseType: 'json' }).subscribe(data => {
        resolve(data['data'][0]) 
      })); 
 
      if(this.modelDatum){
        if(!this.modelDatum.xControlAnimation)
          this.xControlAnimation = 0;
        if(!this.modelDatum.yControlAnimation)
          this.yControlAnimation = 0;
        if(!this.modelDatum.zControlAnimation)
          this.zControlAnimation = -0.02;    
        

        this.zControl = this.modelDatum.zControl;
        this.guiParams =  {
          zPosition: this.modelDatum.zPosition,
          yPosition: this.modelDatum.yPosition,
          xPosition: this.modelDatum.xPosition,

          zControl: this.modelDatum.zControl,
          yControl: this.modelDatum.yControl,
          xControl: this.modelDatum.xControl,

          
          zControlAnimation: this.modelDatum.zControlAnimation,
          yControlAnimation: this.modelDatum.yControlAnimation,
          xControlAnimation: this.modelDatum.xControlAnimation,
          switch: false
        }
        
      }else{
        console.log("else condition");
        this.guiParams =  {
          zPosition: -20,
          yPosition: 0,
          xPosition: 0,

          zControl: -.02,
          yControl: 1,
          xControl: 0,

          zControlAnimation: -.02,
          yControlAnimation: 0,
          xControlAnimation: 0,
          switch: false
        }
      }
     
     
      this.xControl = this.guiParams.xControl;
      this.yControl = this.guiParams.yControl;
      this.zControl = this.guiParams.zControl;

      this.xPosition = this.guiParams.xPosition;
      this.yPosition = this.guiParams.yPosition;
      this.zPosition = this.guiParams.zPosition;

      this.xControlAnimation = this.guiParams.xControlAnimation;
      this.yControlAnimation = this.guiParams.yControlAnimation;
      this.zControlAnimation = this.guiParams.zControlAnimation;


      if (this.webEnable){
        this.container = document.createElement( 'div' );
        this.container.style.height = (screen.width*45/100)+"px"        
        document.getElementById("imanual-app").appendChild( this.container ); 
        this.progressBar = document.getElementById('progressBar') as HTMLProgressElement;

        //get environment
        this.rgbLoader  = new RGBELoader();
        console.log("DATAMODEL",this.modelDatum);
        this.rgbLoader.setPath( this.modelDatum.path);       
        this.texture = await new Promise(resolve => this.rgbLoader.load("/"+this.modelDatum.environmentFile, texture => resolve(texture)));
     
         //get textures
         const loader = new GLTFLoader()
         this.model  = await new Promise(resolve => loader.load(this.modelDatum.path+'/'+this.modelDatum.model, gltf => resolve(gltf),  function(xhr) {
          if ( xhr.lengthComputable ) {

          console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            this.progress = ( xhr.loaded / xhr.total * 100 );
          }
        }));
         
        await this.loadHdr(); 
      
         
        this.scene.add( this.model.scene )  
        // Lights
        let ambientLight = new THREE.AmbientLight( 0x000000,1);
  
        this.scene.add( ambientLight ); 
         
          //camera
         this.model.cameras.forEach(a => { 
          this.cameras.push(a.name)
         }) 
         
         this.init();  
        
        }               
  }
 
 
 

  onChangeEvent($event){
  
    var fieldName = $event.target.name;
    var fieldVal = parseFloat($event.target.value);
  
    if (Number.isNaN(fieldVal)){
      fieldVal = 0
    }
    switch(fieldName) { 
      case 'xControl': { 
        this.guiParams.xControl = fieldVal;
        break; 
      } 
      case 'yControl': { 
        this.guiParams.yControl = fieldVal;
        break; 
      } 
      case 'zControl': { 
        this.guiParams.zControl = fieldVal;
        break;  
      } 

      case 'xControlAnimation': { 
        this.guiParams.xControlAnimation = fieldVal;
        break; 
      } 
      case 'yControlAnimation': { 
        this.guiParams.yControlAnimation = fieldVal;
        break; 
      } 
      case 'zControlAnimation': { 
        this.guiParams.zControlAnimation = fieldVal;
        break;  
      } 
      
      case 'xPosition': { 
        this.guiParams.xPosition = fieldVal;
        break;  
      } 
      case 'yPosition': { 
        this.guiParams.yPosition = fieldVal;
        break; 
      } 
      case 'zPosition': { 
        this.guiParams.zPosition = fieldVal;
        break; 
      }
      
   } 
   this.init();
  }

 
  // set environment
  loadHdr = async ()=> {
    this.pmremGenerator = new THREE.PMREMGenerator( this.renderer );
    this.pmremGenerator.compileEquirectangularShader();      
    this.envMap = this.pmremGenerator.fromEquirectangular( this.texture ).texture;
    this.scene.environment = this.envMap;
    this.texture.dispose();
    this.pmremGenerator.dispose();                      
    this.envMap = this.envMap;        
  }

 
    init = async ()=> { 

     this.camera = this.model.cameras[this.cam]; 
     const annotationsPanel: HTMLDivElement = document.getElementById("annotationsPanel") as HTMLDivElement
     annotationsPanel.style.display = "none";
     $("#imanual-app").css({
      "visibility": "hidden"
    });          
             this.camera.position.set( this.guiParams.xPosition,  this.guiParams.yPosition,  this.guiParams.zPosition );    
       
  
            this.renderer.setSize( this.container.clientWidth, this.container.clientHeight);
            this.container.appendChild( this.renderer.domElement );
        
            this.controls = new OrbitControls( this.camera, this.renderer.domElement );

                   
            this.controls.minDistance = 2;
            this.controls.maxDistance = 10;
            
            this.controls.target.set(parseInt(this.guiParams.xControl), parseInt(this.guiParams.yControl), parseFloat(this.guiParams.zControl))
            this.controls.update();

                               
             
            if(this.iniLoad){
              this.iniLoad = false
               window.addEventListener( 'resize', this.onWindowResize.bind(Event, this.model), false)
               this.container.addEventListener('click', this.onClick.bind(Event, this.model), false);
     
                this.initialResize();
               this.renderLoad();   
              
            }else{
              this.render();
            }
              
             
}
initialResize = () =>{   
  this.container.style.height = window.innerHeight-100+"px";
  this.camera.aspect = (window.innerWidth)/2 / (window.innerHeight-100);
  this.camera.updateProjectionMatrix();
  this.renderer.setSize( (window.innerWidth)/2, window.innerHeight-100 );
}


 onWindowResize = (model:any , event: MouseEvent) =>{   
  console.log("onWindowResize");
  this.container.style.height = window.innerHeight-100+"px";
  this.camera.aspect = (window.innerWidth)/2 / (window.innerHeight-100);
  this.camera.updateProjectionMatrix();
  this.renderer.setSize( (window.innerWidth)/2, window.innerHeight-100 );
  this.render();
}

onMouseMove = (event: MouseEvent) => {  
    console.log("onMouseMove");
      this.raycaster.setFromCamera({
        x: ((event.clientX - this.renderer.domElement.offsetLeft) / this.renderer.domElement.clientWidth) * 2 - 1,
        y: -((event.clientY - this.renderer.domElement.offsetTop) / this.renderer.domElement.clientHeight) * 2 + 1
       }, this.camera);
       
        const intersects =  this.raycaster.intersectObjects(this.model.scene.children, true);   
        if (intersects.length > 0) { 
            
        }       
}


  onClick = ( model:any , event: MouseEvent) => {
    this.render();
  }

  updateVal(){
    console.log("guiParams>>>>", this.guiParams);
    this.http.post(environment["baseUrl"] + "model/update", { data: this.guiParams, id: this.id}).subscribe(data => {
      if(data['status']){
        
        this.toastr.success('Model Updated', 'Success', {
          timeOut: 3000,
        });
        this.router.navigate(['admin/model/'])
      }
      else
        alert('Some Error Occured');  
 
    });


  }

  back(){
    $(".dg.main").css({
      "visibility": "hidden"
    });
    this.router.navigate(['admin/model'])
  }

   

   render = () => {
      this.controls.update()
      this.renderer.setClearColor(0x000000, 0); 
      this.renderer.physicallyCorrectLights = true;  
      this.renderer.render(this.scene, this.camera);          
    }

   //render initial load only
  renderLoad = () => {
    this.controls.update()
    let newInst = this;
    let callback = function() {
      newInst.renderer.setClearColor(0x000000, 0); 
      newInst.renderer.physicallyCorrectLights = true;  
      newInst.renderer.render(newInst.scene, newInst.camera);
      $('#progressBar').css({
        "visibility": "hidden"
      });    
      $("#imanual-app").css({
        "visibility": "visible"
      });          
    }
      setTimeout(callback, 1200); 
      
  }

  zoomIn = () =>{
    console.log("Position>>>", this.camera.position.x, this.camera.position.y, this.camera.position.z);
    // console.log("OriginalPosition>>>", this.guiParams.xPosition, this.guiParams.yPosition, this.guiParams.zPosition);
    // // this.camera.position.z = 3;
    // // this.camera.position.z = 3;
    // this.camera.position.set( this.camera.position.x, this.camera.position.y,  this.camera.position.z*2);    
    // this.controls.update()
    this.camera.position.normalize().multiplyScalar(5)
    this.render();
  }
  
  zoomModel(isZoomOut, scale) {
    if(isZoomOut){
     this.controls.dollyIn(scale);
    }else{
      this.controls.dollyOut(scale);
   }
   } 
   
}




