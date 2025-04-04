
import { Component,ChangeDetectionStrategy, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import { AuthHelperService } from '../../services/admin/authHelper.service';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CmsComponent implements OnInit {

  cmsData = []
  status=false;
  userId=""
  cmsDataMove = []
 

  constructor(private auth: AuthHelperService, private http: HttpClient, private route: ActivatedRoute) { 
    this.http.get(environment["baseUrl"]+"cms", { responseType: 'json'}).subscribe(data => {
      this.cmsData= data['data'];
    })
  }

  ngOnInit(): void {
     localStorage.setItem('lang', "en");
     let user = this.auth.currentUser;
     this.userId = user._id;
  }

  moveUp(value, index) {
    if (index > 0) {

      this.http.get(environment["baseUrl"]+"cms", { responseType: 'json'}).subscribe(data => {
      this.cmsDataMove= data['data'];
      for (let i = 0; i < this.cmsDataMove.length; i++) {
        this.cmsData[i]['status']= this.cmsDataMove[i]['status']
      }
  
      const tmp = this.cmsData[index - 1];
      this.cmsData[index - 1] = this.cmsData[index];
      this.cmsData[index] = tmp;
      for (let i = 0; i < this.cmsData.length; i++) {
        this.cmsData[i]['order']= i
      } 

      this.http.post(environment["baseUrl"]+"cms/order", { data: this.cmsData }).subscribe(data => {
        
      }) 
       
      })     
    }
  }

 moveDown(value, index) {
      if (index < this.cmsData.length) {
        this.http.get(environment["baseUrl"]+"cms", { responseType: 'json'}).subscribe(data => {
          this.cmsDataMove= data['data'];
          for (let i = 0; i < this.cmsDataMove.length; i++) {
            this.cmsData[i]['status']= this.cmsDataMove[i]['status']
          }
          const tmp = this.cmsData[index + 1];
          this.cmsData[index + 1] = this.cmsData[index];
          this.cmsData[index] = tmp;
          for (let i = 0; i < this.cmsData.length; i++) {
              this.cmsData[i]['order']= i
          }
          this.http.post(environment["baseUrl"]+"cms/order", { data: this.cmsData }).subscribe(data => {          
          }) 
        }) 
      }
    }

  statusChange(values:any, id:any):void {
    this.status = values.currentTarget.checked;
    this.http.post(environment["baseUrl"]+"cms/status", { _id:id, status: values.currentTarget.checked, userId: this.userId }).subscribe(data => {
      // UPDATED
    }) 
  }
}

