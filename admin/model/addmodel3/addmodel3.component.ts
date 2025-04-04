import { Component,ViewChild, ElementRef,Renderer2, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType, HttpResponse } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';

import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthHelperService } from '../../../services/admin/authHelper.service';

@Component({
  selector: 'app-addmodel3',
  templateUrl: './addmodel3.component.html',
  styleUrls: ['./addmodel3.component.scss']
})
export class Addmodel3Component implements OnInit {
  @ViewChild('iframe') iframe: any;
  id="";
  source: string = '';
  frame1: string = '';
  editurl: string = 'javascript:void(0)';
  finalRes; modelData;
  progress: number = 0;
  selectedFile: File
  selectFile = {}
  uploadPercent = 0
  title =""
  model_id=""
  userId=""
  model=""
  constructor(private auth: AuthHelperService,private http: HttpClient, private route: ActivatedRoute, private router:Router, public sanitizer: DomSanitizer,   private renderer: Renderer2, private toastr: ToastrService, private location: Location) { 
     this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.title = 'some'
    this.id= this.route.snapshot.paramMap.get('id');
    
  }
  
  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
   
    let obj = {
      size: this.selectedFile.size.toString(),
      fileName: this.selectedFile.name,
      selectedFile: this.selectedFile,
      fileId: `${this.selectedFile.name}-${this.selectedFile.lastModified}`,
      uploadCompleted: false
    }
    console.log("obj",obj)
    this.selectFile= obj
    
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
    // fetch the file status on upload
    let headers = new HttpHeaders({
      "size": file.selectedFile.size.toString(),
      "x-file-id": file.fileId,
      'name': file.fileName
    });
    console.log("headers",headers)

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
    this.getFileUploadStatus(this.selectFile)
    event.preventDefault();
    if(this.uploadPercent < 100)
      this.resumeUpload(this.selectFile);
  }

  resumeUpload(file) {
    const headers2 = new HttpHeaders({
      "size": file.selectedFile.size.toString(),
      "x-file-id": file.fileId,
      "x-start-byte": "0",
      'name': file.fileName,
      'title': this.title,
      'model_id': this.id,
      'user_id': this.userId
    });

    const req = new HttpRequest('POST', environment["baseUrl"]+"model/uploadVideo", file.selectedFile.slice(file.uploadedBytes, file.selectedFile.size + 1 ),{
          headers: headers2,
          reportProgress: true //this will give us percentage of file uploaded
          
        });
        
    this.http.request(req).subscribe(
      (res: any) => {
        if(res instanceof HttpResponse){
         
          if("/assets/video/"+file.fileName){
            
            this.toastr.success('video uploaded', 'Success', {
              timeOut: 3000,
            });
            window.location.reload(); 
          }else{
            this.toastr.success('video uploaded', 'Success', {
              timeOut: 3000,
            });
            window.location.reload(); 
          }
          
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

  back(){
    this.router.navigate(['admin/model'])
  }

  // onChange({  value: selectedValue }) {
    
  //   var target1=this.modelData['data'].find(temp=>temp.language==selectedValue)
  //   if(target1){
  //     this.id = target1._id;
  //     this.router.navigate(['/admin/model/add/step4', this.id]);
  //   }else{
  //     console.log("error");
  //   }
  // }

  

  


// deleteFile(file){
//   this.selectedFile.name.splice(this.selectedFile.indexOf(file), 1);
// }

}

