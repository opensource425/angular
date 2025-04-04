import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthHelperService } from '../../../services/admin/authHelper.service';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-editmodel',
  templateUrl: './editmodel.component.html',
  styleUrls: ['./editmodel.component.scss']
})
export class EditmodelComponent implements OnInit {

  constructor(private auth: AuthHelperService, private http: HttpClient, private route: ActivatedRoute, private router:Router,  private toastr: ToastrService) { 
  }
  languages= [{'id':'en','value':'English'}, {'id':'de','value':'German'},{'id':'es','value':'Spanish'},{'id':'zh','value':'Chinese'}]
  id = ""
  finalRes =""
  modelData;
  lang = 'en';
  title = ""
  titleHeading =""
  nrSelect = this.lang
  userId=""

  ngOnInit(): void {
    let user = this.auth.currentUser;
    this.userId = user._id;
    this.id= this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.http.get(environment["baseUrl"] + "model/"+this.id, { responseType: 'json' }).subscribe(data => {
        if(data['data']){
          this.finalRes= data['data'];
          this.titleHeading= data['data'].title!='' ?data['data'].title:"";

          this.title= data['data'].title.toString();
          this.lang = data['data'].language;

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

  updateModel(){
    this.http.post(environment["baseUrl"] + "model/title/update", { title: this.title, id: this.id, userId: this.userId }).subscribe(data => {
      if(data['status']){
        this.toastr.success('Title Updated', 'Success', {
          timeOut: 3000,
        });
        this.router.navigate(['admin/model']);
      } else{
        this.toastr.error(data['message'], 'Danger', {
          timeOut: 3000,
        });
      // 
      }
    });
  }

  onChange({  value: selectedValue }) {
    this.lang = selectedValue;
  
    var target1=this.modelData['data'].find(temp=>temp.language==selectedValue)
    if(target1){
      this.title= target1.title.toString();
      this.id = target1._id;
      
    }else{
      console.log("error");
    }
  }

  back(){
    this.router.navigate(['admin/model'])
  }
}
