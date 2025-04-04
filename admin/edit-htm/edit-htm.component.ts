import { Component,Renderer2, OnInit } from '@angular/core';
import { CKEditor4 } from 'ckeditor4-angular/ckeditor';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AuthHelperService } from '../../services/admin/authHelper.service';

@Component({
  selector: 'app-edit-htm',
  templateUrl: './edit-htm.component.html',
  styleUrls: ['./edit-htm.component.scss']
})
export class EditHtmComponent implements OnInit {

  userId="";
  id="";
  param1;
  htmlContent = "";


  constructor(private auth: AuthHelperService, public sanitizer: DomSanitizer,   private renderer: Renderer2, private http: HttpClient, private route: ActivatedRoute, private router: Router, private toastr: ToastrService, private location: Location ) {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  
  ngOnInit(): void {
    let user = this.auth.currentUser;
    this.userId = user._id;
   
    this.param1 = this.route.snapshot.queryParamMap.get('url');
    this.id = this.route.snapshot.queryParamMap.get('id');
    if(this.param1=="TrainingMaterial"){
      this.http.get(environment["baseUrl"] + "model/html?url=" + this.param1+"/index.html", { responseType: 'text' }).subscribe(data => {
        this.htmlContent = data.toString();
      })
    }else{
      this.http.get(environment["baseUrl"] + "model/html?url=" + this.param1, { responseType: 'text' }).subscribe(data => {
        this.htmlContent = data.toString();
      })
    }
  }

  updateHTML() {
    let data = this.htmlContent;
    this.http.post(environment["baseUrl"] + "model/html1", { html_data: data, url: this.param1, id:this.id, userId: this.userId}).subscribe(data => {
      this.toastr.success('HTML Updated', 'Success', {
        timeOut: 3000,
      });
      this.location.back(); 
      
    })
  }
  public onChange( event: CKEditor4.EventInfo ) {
    this.htmlContent=  event.editor.getData() ;
  }

  back(){
    this.location.back(); 
  }


}
