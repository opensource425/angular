import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthHelperService } from '../../../services/admin/authHelper.service';

@Component({
  selector: 'app-addmodel',
  templateUrl: './addmodel.component.html',
  styleUrls: ['./addmodel.component.scss']
})
export class AddmodelComponent implements OnInit {

constructor(private auth: AuthHelperService, private http: HttpClient, private router: Router,private toastr: ToastrService) {
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;

 }
  languages= [{'id':'en','value':'English'}]
  langList = ['en','de','zh','es'];
  title =""
  model_id=""
  userId=""


  ngOnInit(): void {
    let user = this.auth.currentUser;
    this.userId = user._id;
  }


  uploadTitle(){
    this.http.post(environment["baseUrl"] + "model/add", { title: this.title, languages: this.langList, userId:this.userId}).subscribe(data => {
      if(data['status']){
        this.toastr.success('Device Added', 'Success', {
          timeOut: 3000,
        });
        this.router.navigate(['admin/model/'])
      }
      else
      this.toastr.error(data['message'], 'Error!', {
        timeOut: 3000,
      });
    });
  }


  back(){
    this.router.navigate(['admin/model'])
  }

}
