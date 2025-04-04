import { Component, ChangeDetectionStrategy, OnInit,TemplateRef } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ModelService } from '../../services/modelviewer/model.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ModelComponent implements OnInit {
  modalRef: BsModalRef;
  message: string; 
  deletedId:any; 
  modelData = []
  modelDataMove=[]
  status=false;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router:Router, private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService,private modalService: BsModalService,private toastr: ToastrService,private modelViewService:ModelService) { 
    this.http.get(environment["baseUrl"]+"model", { responseType: 'json'}).subscribe(data => {
      this.modelData= data['data'];
    })
  }

  ngOnInit(): void {
    
  }

  moveUp(value, index) {
    if (index > 0) {

      this.http.get(environment["baseUrl"]+"model", { responseType: 'json'}).subscribe(data => {
      this.modelDataMove= data['data'];
        for (let i = 0; i < this.modelDataMove.length; i++) {
          this.modelData[i]['status']= this.modelDataMove[i]['status']
        }

      const tmp = this.modelData[index - 1];
      this.modelData[index - 1] = this.modelData[index];
      this.modelData[index] = tmp;
      for (let i = 0; i < this.modelData.length; i++) {
        this.modelData[i]['order']= i
      }
      this.http.post(environment["baseUrl"]+"model/order", { data: this.modelData }).subscribe(data => {
      }) 
    })
    }
  }

 moveDown(value, index) {
      if (index < this.modelData.length) {

        this.http.get(environment["baseUrl"]+"model", { responseType: 'json'}).subscribe(data => {
          console.log(data['data'])
          this.modelDataMove= data['data'];
          for (let i = 0; i < this.modelDataMove.length; i++) {
            console.log("stauts",this.modelDataMove[i])
            this.modelData[i]['status']= this.modelDataMove[i]['status']
          }


        const tmp = this.modelData[index + 1];
        this.modelData[index + 1] = this.modelData[index];
        this.modelData[index] = tmp;
        for (let i = 0; i < this.modelData.length; i++) {
            this.modelData[i]['order']= i
        }
        this.http.post(environment["baseUrl"]+"model/order", { data: this.modelData }).subscribe(data => {
          console.log("status>>>", "updated")
        }) 
      })
      }
    }

    statusChange(values:any, id:any):void {
      this.status = values.currentTarget.checked;
      this.http.post(environment["baseUrl"]+"model/status", { _id:id, status: values.currentTarget.checked }).subscribe(data => {
        // UPDATED  
      }) 
    }

    

    openModal(template: TemplateRef<any>,deletedId:any) {
      this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
      
      this.deletedId=deletedId
      
    }
   
    confirm():void {
   
        this.modelViewService.delete(this.deletedId).subscribe(
          (mydata)=>{
            this.toastr.success("deleted successfully",'Success!', {
              timeOut: 3000,

            });
            window.location.reload();
            this.modalRef.hide();
          }
        )
        
    
    
    }
   
    decline(): void {
      this.modalRef.hide();
    }
}

