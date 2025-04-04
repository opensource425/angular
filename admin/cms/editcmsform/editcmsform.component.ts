import { Component, OnInit } from '@angular/core';
import { CKEditor4 } from 'ckeditor4-angular/ckeditor';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { AuthHelperService } from '../../../services/admin/authHelper.service';


@Component({
  selector: 'app-editcmsform',
  templateUrl: './editcmsform.component.html',
  styleUrls: ['./editcmsform.component.scss']
})
export class EditcmsformComponent implements OnInit {
  param1: string;
  constructor(private auth: AuthHelperService, private http: HttpClient, private route: ActivatedRoute, private router:Router, private toastr: ToastrService) { 
    
  }

  id=""
  htmlContent = ""
  title = ""
  userId:"";
  selectedLang;
  errors="";
  cmsId="";
  finalRes;
  lang = localStorage.getItem('lang')!=null?localStorage.getItem('lang'):'en';
  nrSelect = this.lang
  languages= [{'id':'en','value':'English'}, {'id':'de','value':'German'}]


  ngOnInit() : void {
    let user = this.auth.currentUser;
    this.userId = user._id;
    this.id= this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.http.get(environment["baseUrl"] + "cms/"+this.id, { responseType: 'json' }).subscribe(data => {
        if(data['data'][0]){
          this.finalRes= data['data'][0]['datum'];
          
          var target=this.finalRes.find(temp=>temp.language==this.lang)
          if(target){
                this.cmsId = target._id;
                this.htmlContent = target.data.toString();
                this.title= target.title.toString();
                this.selectedLang= this.languages[1];
          }
        }
        
      })
    }
  }

 
  

  addCMSPage(){
    this.http.post(environment["baseUrl"] + "cms/check", { title: this.title, id: this.cmsId}).subscribe(data => {
        if(data['success']==false){
          if (this.cmsId){
            // UPDATE
            this.http.post(environment["baseUrl"] + "cms/update", { title: this.title, data: this.htmlContent, id: this.cmsId, cms:this.id, userId: this.userId}).subscribe(data => {
              this.toastr.success('Page Updated', 'Success', {
                timeOut: 3000,
              });
              this.router.navigate(['admin/cms']);
            })
          }else{
            // INSERT
            
            this.http.post(environment["baseUrl"] + "cms/add", { data: this.htmlContent ,title: this.title, id: this.cmsId, cms: this.id, language: this.lang, userId: this.userId}).subscribe(data => {
              this.toastr.success('Page Updated', 'Success', {
                timeOut: 3000,
              });
            })
            this.router.navigate(['admin/cms']);
          }
        } else{
          this.toastr.error(data['message'], 'Error!', {
            timeOut: 3000,
          });
          this.router.navigate(['admin/cms']);
        }
      });
   
  }

  onChange({  value: selectedValue }) {
    this.selectedLang = selectedValue;
    localStorage.setItem('lang', this.selectedLang);
    var target1=this.finalRes.find(temp=>temp.language==selectedValue)
    if(target1){
      this.cmsId = target1._id;
      this.htmlContent = target1.data.toString();
      this.title= target1.title.toString();
      

      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
     
      
    } else{
      this.cmsId = "";
      this.htmlContent = "";
      this.title= "";

      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    }
  }

  public onChangeEditor( event: CKEditor4.EventInfo ) {
    this.htmlContent=  event.editor.getData() ;
  }

  back(){
    this.router.navigate(['admin/cms'])
  }
}
