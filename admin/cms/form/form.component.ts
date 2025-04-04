
import { Component, OnInit } from '@angular/core';
import { CKEditor4 } from 'ckeditor4-angular/ckeditor';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder} from "@angular/forms";
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { AuthHelperService } from '../../../services/admin/authHelper.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  param1: string;
  userId:"";
  cmsForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  CurrentState: any;
  IsFormValid = true;

  constructor(private auth: AuthHelperService,private http: HttpClient, private route: ActivatedRoute, private router:Router, private toastr: ToastrService, private fb: FormBuilder) { 
    
    this.CurrentState = 'Wait';
  }
  id=""
  htmlContent = ""
  title = ""
  selectedLang="";
  errors=""
  pageTitle="Add Page"
  languages= [{'id':'en','value':'English'}, {'id':'de','value':'German'}]
  ngOnInit(): void {
    let user = this.auth.currentUser;
    this.userId = user._id;
    this.id= this.route.snapshot.queryParamMap.get('id');
    if(this.id){
      this.pageTitle="Details"
      this.http.get(environment["baseUrl"] + "cms/"+this.id, { responseType: 'json' }).subscribe(data => {
        if(data['data'])
          this.htmlContent = data['data']['data'].toString();
          this.title= data['data']['title'].toString();
      })
    }
  }

  
 
  onFormSubmit(form){
    
      this.IsFormValid=true;
      if(this.id){
        
        this.http.post(environment["baseUrl"] + "cms", { html_data: this.htmlContent, title: this.title, _id: this.id, language: this.selectedLang, userId: this.userId }).subscribe(data => {
          this.toastr.error("Page Updated", 'Error!', {
            timeOut: 3000,
          });
          this.router.navigate(['admin/cms']);
        })
      }else{
        this.http.get(environment["baseUrl"] + "cms/check/"+ this.title, { responseType: 'json' }).subscribe(data => {
          
          if(data['success']==false){
              this.http.post(environment["baseUrl"] + "cms", { html_data:  this.htmlContent, title:  this.title, language: "en", userId: this.userId }).subscribe(data => {
                this.toastr.success("Page Added", 'Success!', {
                  timeOut: 3000,
                });
                this.router.navigate(['admin/cms']);
              });
          }else{
            console.log(data['message']);
            this.errors = data['message'];
          }
        })
      }
  }

  public onChangeEditor( event: CKEditor4.EventInfo ) {
    this.htmlContent=  event.editor.getData() ;
  }

  back(){
    this.router.navigate(['admin/cms'])
  }

}

