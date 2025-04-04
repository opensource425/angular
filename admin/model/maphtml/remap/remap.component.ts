import { Component,  OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common';

import { environment } from '../../../../../environments/environment';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
@Component({
  selector: 'app-remap',
  templateUrl: './remap.component.html',
  styleUrls: ['./remap.component.scss']
})
export class RemapComponent implements OnInit {

  capterList=[]
  modelName=""
  model_id=""
  main_id=""
  id = ""
  topic_file =""
  public urlSafe
  public modelData
  public select
  public topicList
  defaultState = this.topic_file;


  selectedData={}
  constructor(private _location: Location, public sanitizer: DomSanitizer,   private http: HttpClient, private route: ActivatedRoute, private router:Router, private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService) { 
    
  }

  config = {
    displayKey:"description", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: '300px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Search', // label thats displayed in search input,
    
    }
  
  ngOnChanges() {
    this.ngOnInit()
  }


  async  ngOnInit():  Promise<void> {
    this.id= this.route.snapshot.paramMap.get('id');
    this.model_id= this.route.snapshot.paramMap.get('model_id');
    this.main_id = this.route.snapshot.paramMap.get('main_id');

    let capterData:any = await new Promise(resolve => this.http.get(environment["baseUrl"]+"model/capter/"+this.main_id, { responseType: 'json'}).subscribe(data => {
      resolve(data) 
    }));

    this.capterList= capterData['data'];
    this.selectedData = capterData['data'][this.id]
    this.topic_file = capterData['data'][this.id]['_topic'];

    let finalRes:any = await new Promise(resolve => this.http.get(environment["baseUrl"] + "model/"+this.model_id, { responseType: 'json' }).subscribe(data => {
      resolve(data) 
    }));

    this.modelData = finalRes['data'];
    this.modelName = finalRes['data']['title'];
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(finalRes['data'].path+'/TrainingMaterial/content/'+this.topic_file);
    let topics:any = await new Promise(resolve =>  this.http.get(environment["baseUrl"]+"model/html/files/"+this.model_id, { responseType: 'json'}).subscribe(data => {
        resolve(data) 
    }));

      this.topicList = topics['data']
     
  }

  // ONCHANGE SELECT 
  changeValue({  value: selectedValue }) {

    this.topic_file = selectedValue;
    console.log(">>>>>>", this.modelData.path)
    this.urlSafe =this.sanitizer.bypassSecurityTrustResourceUrl(this.modelData.path+'/TrainingMaterial/content/'+ this.topic_file)
  }

  back(){
    this.router.navigate(['admin/model/map', this.model_id])
  }

  updateTopic(){
    this.http.post(environment["baseUrl"] + "model/topic", { topic_name: this.topic_file, index: this.id, model_id: this.model_id }).subscribe(data => {
      if(data['success']){
        console.log("success");
        this.router.navigate(['admin/model/map/'+this.model_id])
      }
    })
  }

  onRevert(){
    console.log("",this.selectedData['_topic'])
    this.select = this.selectedData['_topic'];
    this.urlSafe =this.sanitizer.bypassSecurityTrustResourceUrl(this.modelData.path+'/TrainingMaterial/content/'+ this.selectedData['_topic'])
  }
}
