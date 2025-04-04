import { Component,  OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
@Component({
  selector: 'app-maphtml',
  templateUrl: './maphtml.component.html',
  styleUrls: ['./maphtml.component.scss']
})
export class MaphtmlComponent implements OnInit {
  capterList=[]
  modelName =""
  id = ""
  title = ""
  main_id=""
  htmlPath=""
  public modelData;
  languages= [{'id':'en','value':'English'}, {'id':'de','value':'German'},{'id':'es','value':'Spanish'},{'id':'zh','value':'Chinese'}]
  lang = 'en';
  constructor(private http: HttpClient, private route: ActivatedRoute, private router:Router, private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnChanges() {
    this.ngOnInit()
  }


  async  ngOnInit():  Promise<void> {
    this.id= this.route.snapshot.paramMap.get('id');
    let finalRes:any = await new Promise(resolve => this.http.get(environment["baseUrl"] + "model/"+this.id, { responseType: 'json' }).subscribe(data => {
      resolve(data) 
    }));

    finalRes= finalRes['data'];
    this.modelName= finalRes.title.toString();
    this.htmlPath = finalRes.html;
    this.lang = finalRes.language;
    this.title = finalRes.title;
    this.main_id = finalRes.model;

    // GET ALL DATA OF MAIN MODEL
    let modelDatum:any = await new Promise(resolve => this.http.get(environment["baseUrl"] + "model/main/"+finalRes.model, { responseType: 'json' }).subscribe(datum => {
      resolve(datum) 
    }));
    if(modelDatum['data'].length>0){
      this.modelData = modelDatum['data'][0];
    }
    else
      modelDatum = null;
        
    // GET ALL CAPTER LIST
    let capterListData:any = await new Promise(resolve => this.http.get(environment["baseUrl"]+"model/capter/"+finalRes.model, { responseType: 'json'}).subscribe(data => {
      resolve(data) 
    }));

    this.capterList = capterListData['data'];
        
  }

  onChange({  value: selectedValue }) {
    this.lang = selectedValue;
    var target1=this.modelData['data'].find(temp=>temp.language==selectedValue)
    console.log(selectedValue)
    if(target1){
      this.id = target1._id;
      this.router.navigate(['/admin/model/map', this.id]);
    }else{
      console.log("error");
    }
  }
}
