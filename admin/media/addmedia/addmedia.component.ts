import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpEventType } from "@angular/common/http";
import { environment } from '../../../../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addmedia',
  templateUrl: './addmedia.component.html',
  styleUrls: ['./addmedia.component.scss']
})
export class AddmediaComponent implements OnInit {

  constructor(private http: HttpClient,  private router: Router, private toastr: ToastrService) { }

  progress: number = 0;
  selectedFile: File
  selectFile = {}
  uploadPercent = 0
  title =""
  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
    console.log("selected_file>>>>", this.selectedFile)
    // if (!this.validateFile(this.selectedFile.name)) {
    //   console.log('Selected file format is not supported');
    //   alert("Only Zip format supported")
    //   return false;
    // }
    let obj = {
      size: this.selectedFile.size.toString(),
      fileName: this.selectedFile.name,
      selectedFile: this.selectedFile,
      fileId: `${this.selectedFile.name}-${this.selectedFile.lastModified}`,
      uploadCompleted: false
    }
    this.selectFile= obj
    this.getFileUploadStatus(this.selectFile)
  }
  
  // onUpload() {
  //   const uploadData = new FormData();
  //   uploadData.append('model', this.selectedFile, this.selectedFile.name);
  //   this.adminService.upload(uploadData)
  //     .subscribe(event => {
        
  //       console.log(event); // handle event here
  //     });
  // }
  
  ngOnInit(): void {
  }
  
  getFileUploadStatus(file){
    // fetch the file status on upload
    let headers = new HttpHeaders({
      "size": file.selectedFile.size.toString(),
      "x-file-id": file.fileId,
      'name': file.fileName
    });
  
    console.log("headers>>>>", file.fileName)
  
    this.http
      .get(environment["baseUrl"]+"model/mediastatus", { headers: headers }).subscribe(
        (res: any) => {
          file.uploadedBytes = res.uploaded;
          file.uploadedPercent = Math.round(100* file.uploadedBytes/file.size);
          this.progress = Math.round(100* file.uploadedBytes/file.size);
          console.log("aa>>>", file.uploadedPercent)
          if(file.uploadedPercent >= 100){
            file.uploadCompleted = true;
          }
        },err => {
          console.log("error>>>>>>>>",err);
        }
      )
  }
  
  uploadFiles(){
    console.log("data>>>>", this.title);
    // this.selectedFile.forEach(file => {
    if(this.uploadPercent < 100)
      this.resumeUpload(this.selectFile);
    // })
  }
  
  resumeUpload(file){
    //make upload call and update the file percentage
    const headers2 = new HttpHeaders({
      "size": file.selectedFile.size.toString(),
      "x-file-id": file.fileId,
      "x-start-byte": file.uploadedBytes.toString(),
      'name': file.fileName,
      'title': this.title
    });
    console.log(file.uploadedBytes, file.selectedFile.size, file.selectedFile.slice(file.uploadedBytes).size);
    var data = {title:this.title, data:file.selectedFile.slice(file.uploadedBytes, file.selectedFile.size + 1 )};
  
    const req = new HttpRequest('POST', environment["baseUrl"]+"model/upload/media", file.selectedFile.slice(file.uploadedBytes, file.selectedFile.size + 1 ),{
           headers: headers2,
          reportProgress: true //this will give us percentage of file uploaded
        });
  
    this.http.request(req).subscribe(
      (res: any) => {
        if(res instanceof HttpResponse){
          this.toastr.success('Media Added Successfully', 'Success', {
            timeOut: 3000,
          });
          this.router.navigate(['admin/media'])
        }
  
        if(res.type === HttpEventType.UploadProgress){
          console.log("-----------------------------------------------");
          console.log(res);
          file.uploadedPercent = Math.round(100* (file.uploadedBytes+res.loaded)/res.total);
          this.progress = Math.round(100* (file.uploadedBytes+res.loaded)/res.total);
          // Remember, reportProgress: true  (res.loaded and res.total) are returned by it while upload is in progress
  
  
          console.log(file.uploadedPercent);
          if(file.uploadedPercent >= 100){
            file.uploadCompleted = true;
          }
        }else{
          if(file.uploadedPercent >= 100){
            file.uploadCompleted = true;
            // this.selectedFile.splice(this.selectedFile.indexOf(file), 1);
          }
        }
      },
      err => {
        console.log(err)
      }
    )
  }

  back(){
    this.router.navigate(['admin/media'])
  }
  
  // validateFile(name: String) {
  //   var ext = name.substring(name.lastIndexOf('.') + 1);
  //   if (ext.toLowerCase() == 'jpeg'||ext.toLowerCase() == 'png') {
  //       return true;
  //   }
  //   else {
  //       return false;
  //   }
  // }
  
  
  // deleteFile(file){
  //   this.selectedFile.name.splice(this.selectedFile.indexOf(file), 1);
  // }
  
  }