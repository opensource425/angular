import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';

import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users = []
  status = false
  constructor(private http: HttpClient, private route: ActivatedRoute) { 
    
    this.http.get(environment["baseUrl"]+"users", { responseType: 'json'}).subscribe(data => {
      this.users= data['data'];
      console.log("ssss>>>", data['data'])

  })
  }
  ngOnInit(): void {


  }

  statusChange(values:any, id:any):void {
    this.status = values.currentTarget.checked;
    console.log(values.currentTarget.checked);
    console.log("id>>>>",id);
    this.http.post(environment["baseUrl"]+"users/status", { _id:id, status: values.currentTarget.checked }).subscribe(data => {
      // if(this.status)
      //   alert("Page Activated")
      // else
      //   alert("Page Deactivated") 

    }) 
  }
}
