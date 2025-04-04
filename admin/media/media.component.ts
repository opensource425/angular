import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';

import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
  media = []
  constructor(private http: HttpClient, private route: ActivatedRoute) { 
    
    this.http.get(environment["baseUrl"]+"model/files", { responseType: 'json'}).subscribe(data => {
      this.media= data['success'];
      console.log("ssss>>>", data['success'])

  })
  }
  ngOnInit(): void {


  }

  copyMessage(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
