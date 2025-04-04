import { Component,ViewChild, ElementRef,Renderer2, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType, HttpResponse } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';

import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthHelperService } from '../../../services/admin/authHelper.service';

@Component({
  selector: 'app-addmodel2',
  templateUrl: './addmodel2.component.html',
  styleUrls: ['./addmodel2.component.scss']
})
export class Addmodel2Component implements OnInit {
  @ViewChild('iframe') iframe: any;

  constructor(private auth: AuthHelperService,private http: HttpClient, private route: ActivatedRoute, private router:Router, public sanitizer: DomSanitizer,   private renderer: Renderer2, private toastr: ToastrService, private location: Location) { 
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  languages= [{'id':'en','value':'English'}, {'id':'de','value':'German'},{'id':'es','value':'Spanish'},{'id':'zh','value':'Chinese'}] 
  lang = 'en';
  id="";
  source: string = '';
  frame1: string = '';
  editurl: string = 'javascript:void(0)';
  iFrameUrl;
  urlSafe;
  safeEdit;
  finalRes; modelData;
  progress: number = 0;
  selectedFile: File
  selectFile = {}
  uploadPercent = 0
  title =""
  model_id=""
  userId=""
  model=""
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    
    if (!this.validateFile(this.selectedFile.name)) {
      
      
      alert("Only Zip format supported")
      this.model=""
      return false;
    }
    let obj = {
      size: this.selectedFile.size.toString(),
      fileName: this.selectedFile.name,
      selectedFile: this.selectedFile,
      fileId: `${this.selectedFile.name}-${this.selectedFile.lastModified}`,
      uploadCompleted: false
    }
    
    this.selectFile= obj
    console.log("obj",this.selectFile)
    this.getFileUploadStatus(this.selectFile)
  }



  ngOnInit(): void {
    this.id= this.route.snapshot.paramMap.get('id');
    let user = this.auth.currentUser;
    this.userId = user._id;
      if(this.id){
        this.http.get(environment["baseUrl"] + "model/"+this.id, { responseType: 'json' }).subscribe(data => {
          if(data['data']){
            this.finalRes= data['data'];
            this.title= data['data'].title.toString();
            this.lang = data['data'].language;
            if (data['data'].path){
              this.iFrameUrl = data['data'].path+'/TrainingMaterial/index.html';
              this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.iFrameUrl);
            } else{
              this.iFrameUrl ="";
              
            }

            // GET ALL DATA OF MAIN MODEL
            this.http.get(environment["baseUrl"] + "model/main/"+data['data'].model, { responseType: 'json' }).subscribe(datum => {
                if(datum['data'].length>0)
                  this.modelData = datum['data'][0];
                else
                  this.modelData = null;
                
            })
          }

        })
      }
  }

  onLoadFunc() {
    if(this.iframe){
    this.source = this.iframe.nativeElement.contentWindow.location.href+"?currentTime="+ (new Date()).getTime();
    console.log("source>>>", this.source);
    var pageURL = this.source.slice(this.source.indexOf('html/') + 'html/'.length);
    this.editurl =  "#/admin/model/edit-htm?id="+this.id+"&url="+pageURL;
    }
  }


  getFileUploadStatus(file){
    console.log("file",file)
    // fetch the file status on upload
    let headers = new HttpHeaders({
      "size": file.selectedFile.size.toString(),
      "x-file-id": file.fileId,
      'name': file.fileName
    });

    this.http
      .get(environment["baseUrl"]+"model/htmlstatus", { headers: headers }).subscribe(
        (res: any) => {
          file.uploadedBytes = res.uploaded;
          file.uploadedPercent = Math.round(100* file.uploadedBytes/file.size);
          this.progress = Math.round(100* file.uploadedBytes/file.size);
         
          if(file.uploadedPercent >= 100){
            file.uploadCompleted = true;
          }else{
            console.log("aa>>>", file.uploadedPercent)
          }
        },err => {
          console.log("error>>>>>>>>",err);
        }
      )
  }

  uploadFiles(event: Event) {
    event.preventDefault();
    console.log("upload_percentage>>>>", this.uploadPercent)
    if(this.uploadPercent < 100)
      this.resumeUpload(this.selectFile);
  }

  resumeUpload(file){
    const headers2 = new HttpHeaders({
      "size": file.selectedFile.size.toString(),
      "x-file-id": file.fileId,
      "x-start-byte": file.uploadedBytes.toString(),
      'name': file.fileName,
      'title': this.title,
      'model_id': this.id,
      'user_id': this.userId
    });
    
    const req = new HttpRequest('POST', environment["baseUrl"]+"model/uploadhtml", file.selectedFile.slice(file.uploadedBytes, file.selectedFile.size + 1 ),{
          headers: headers2,
          reportProgress: true //this will give us percentage of file uploaded
        });

    this.http.request(req).subscribe(
      (res: any) => {
        if(res instanceof HttpResponse){
          this.toastr.success('HTML Updated', 'Success', {
            timeOut: 3000,
          });
          window.location.reload(); 
        }
        
        if(res.type === HttpEventType.UploadProgress){
          file.uploadedPercent = Math.round(100* (file.uploadedBytes+res.loaded)/res.total);
          this.progress = Math.round(100* (file.uploadedBytes+res.loaded)/res.total);
          if(file.uploadedPercent >= 100) {
            file.uploadCompleted = true;
          }
        }else{
          if(file.uploadedPercent >= 100) {
            file.uploadCompleted = true;
          }
        }
      },
      err => {
        console.log(err)
      }
    )
  }

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'zip') {
        return true;
    }
    else {
        return false;
    }
  }

  back(){
    this.router.navigate(['admin/model'])
  }

  onChange({  value: selectedValue }) {
    this.lang = selectedValue;
    var target1=this.modelData['data'].find(temp=>temp.language==selectedValue)
    if(target1){
      this.id = target1._id;
      this.router.navigate(['/admin/model/add/step3', this.id]);
    }else{
      console.log("error");
    }
  }

  

  


// deleteFile(file){
//   this.selectedFile.name.splice(this.selectedFile.indexOf(file), 1);
// }

}

