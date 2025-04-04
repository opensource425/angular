import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType, HttpResponse } from "@angular/common/http";
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthHelperService } from '../../../services/admin/authHelper.service';


@Component({
  selector: 'app-addmodel1',
  templateUrl: './addmodel1.component.html',
  styleUrls: ['./addmodel1.component.scss']
})
export class Addmodel1Component implements OnInit {

  constructor(private auth: AuthHelperService, private http: HttpClient, private route: ActivatedRoute, private router:Router, private toastr: ToastrService) { }
    id = ""  
    title = ""
    model=""
    progress: number = 0;
    selectedFile: File
    selectFile = {}
    uploadPercent = 0
    userId=""
    onFileChanged(event) {
      this.selectedFile = event.target.files[0]
      if (!this.validateFile(this.selectedFile.name)) {
        alert("Only Zip format supported")
        this.model = '';
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
    this.getFileUploadStatus(this.selectFile)
  }

  ngOnInit(): void {
    this.id= this.route.snapshot.paramMap.get('id');
    let user = this.auth.currentUser;
    this.userId = user._id;
    if(this.id){
      this.http.get(environment["baseUrl"] + "model/main/"+this.id, { responseType: 'json' }).subscribe(data => {
        if(data['data']){
            this.title= data['data'][0]['data'][0]['title'];
        }
      });

    }
  }

  getFileUploadStatus(file){
    // fetch the file status on upload
    let headers = new HttpHeaders({
      "size": file.selectedFile.size.toString(),
      "x-file-id": file.fileId,
      'name': file.fileName
    });

   this.http.get(environment["baseUrl"]+"model/status", { headers: headers }).subscribe(
        (res: any) => {
          file.uploadedBytes = res.uploaded;
          file.uploadedPercent = Math.round(100* file.uploadedBytes/file.size);
          this.progress = Math.round(100* file.uploadedBytes/file.size);
          
          if(file.uploadedPercent >= 100){
            file.uploadCompleted = true;
          }
        },err => {
          console.log("error>>>>>>>>",err);
        }
      )
  }

  uploadFiles(){
    if(this.uploadPercent < 100)
      this.resumeUpload(this.selectFile);
  }


  resumeUpload(file){
    //make upload call and update the file percentage
    const headers2 = new HttpHeaders({
      "size": file.selectedFile.size.toString(),
      "x-file-id": file.fileId,
      "x-start-byte": file.uploadedBytes.toString(),
      'name': file.fileName,
      'title': this.title,
      'model_id': this.id,
      'user_id': this.userId
    });
    const req = new HttpRequest('POST', environment["baseUrl"]+"model/upload", file.selectedFile.slice(file.uploadedBytes, file.selectedFile.size + 1 ),{
          headers: headers2,
          reportProgress: true //this will give us percentage of file uploaded
        });

    this.http.request(req).subscribe(
      (res: any) => {
        if(res instanceof HttpResponse){
          this.toastr.success('Model Added Successfully', 'Success', {
            timeOut: 3000,
          });
          this.router.navigate(['admin/model/'])
        }
        
        if(res.type === HttpEventType.UploadProgress) {
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

}
