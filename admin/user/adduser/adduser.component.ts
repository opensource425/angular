import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router,private route: ActivatedRoute,private toastr: ToastrService) { }

  id="";
  firstname ="";
  lastname="";
  email="";
  password="";
  subadmin_title=""


  form = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)]),
  });
  
  get f(){
    return this.form.controls;
  }

  ngOnInit(): void { 
    this.id= this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.http.get(environment["baseUrl"] + "users/"+this.id, { responseType: 'json' }).subscribe(data => {
        if(data['data']){
          $('#email').attr("readonly","readonly");
          $('#password').attr("readonly","readonly");
           this.firstname = data['data']['firstName'];
           this.lastname = data['data']['lastName'];
           this.email = data['data']['email'];
           this.password = data['data']['password'];
           this.subadmin_title="Edit Sub Admin"
        }
       this.form = new FormGroup({
          firstname: new FormControl(this.firstname, [Validators.required]),
          lastname: new FormControl(this.lastname, [Validators.required]),
          email: new FormControl(this.email, [Validators.required, Validators.email]),
          password: new FormControl(this.password,[Validators.required,Validators.minLength(6)]),
        })  
      })
    }else{
      this.subadmin_title="Add Sub Admin"
    }
  }

  addUser(){
    
    if(this.id){
      const arr = {'firstName':this.form.value.firstname, 'lastName':this.form.value.lastname}
      this.http.post(environment["baseUrl"] + "users/"+this.id, arr).subscribe(data => {
        if(data['success']==true){
          this.toastr.success(data['message'], 'Success', {
            timeOut: 3000,
          });
          this.router.navigate(['admin/users/'])
        }
        else{
          this.toastr.error(data['message'], 'Error', {
            timeOut: 3000,
          });
        }
       });


    }else{
     
      const arr = {'firstName':this.form.value.firstname, 'lastName':this.form.value.lastname, 'email':this.form.value.email, 'password':this.form.value.password, 'isAdmin':0}
      this.http.post(environment["baseUrl"] + "users/register", arr).subscribe(data => {
        if(data['status']){
          this.toastr.success(data['message'], 'Success', {
            timeOut: 3000,
          });
          this.router.navigate(['admin/users/'])
        }
        else{
          this.toastr.error(data['message'], 'Error', {
            timeOut: 3000,
          });
        }
       });
    }
    
  }

  back(){
    this.router.navigate(['admin/users'])
  }


  onChange(event){
    const password = document.getElementById('password') as HTMLInputElement;
    
    if(password.value.length < 6){
      password.setCustomValidity('password must be 6 character');
    }
  }
}
