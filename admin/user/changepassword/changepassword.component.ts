import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../../helpers/must-match.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthHelperService } from '../../../services/admin/authHelper.service';

import * as $ from 'jquery';
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType, HttpResponse } from "@angular/common/http";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  old_password="";
  new_password="";

  constructor(private auth: AuthHelperService, private http: HttpClient, private router: Router,private route: ActivatedRoute,private toastr: ToastrService,public formBuilder: FormBuilder) { 
    

    // this.changePasswordForm = this.formBuilder.group({
    //   old_password: ['', Validators.required],
    //   new_password: ['', [Validators.required,  Validators.minLength(6)]],
    //   confirm_password: ['', [Validators.required,  Validators.minLength(6)]]
     
    //   old_password: new FormControl('', Validators.compose([
    //     Validators.required
       
    //   ])),
    //   new_password: new FormControl('', Validators.compose([
    //     Validators.required,
    //     Validators.minLength(6),
       
    //   ])),
    //   confirm_password: new FormControl('', Validators.compose([
    //     Validators.required,
    //     Validators.minLength(6),
        
    //   ]))
    // // });
    // }, { 

    //     validator: MustMatch('new_password', 'confirm_password')
    // });
   
  }

  ngOnInit(): void {
  }

  changePassword(form){
    // if (form.valid) {
    // const formValue = this.changePasswordForm.value;

    let user = this.auth.currentUser;

    this.http.post(environment["baseUrl"] + "users/change-password/"+user._id, {'old_password':this.old_password, 'new_password':this.new_password}).subscribe(data => {
      if(data['status']){
        this.toastr.success(data['message'], 'Success', {
          timeOut: 3000,
        });
        this.router.navigate(['admin/'])
      }
      else{
        this.toastr.error(data['message'], 'Error', {
          timeOut: 3000,
        });
      }
     });
    // }else{
      
    // }

  }

  back(){
    this.router.navigate(['admin'])
  }

  onChange(event) {

    const password1 = document.getElementById('new-password') as HTMLInputElement;
    const password2 = document.getElementById('confirm-password') as HTMLInputElement;
    const old_password = document.getElementById('old-password') as HTMLInputElement;

        if (old_password.value ===password1.value) {
          password1.setCustomValidity('Old Password & New Password should not be same');
            
        } else if(password1.value != password2.value){
          password2.setCustomValidity('New Password & Confirm Password must match');
        }
        else {
          password2.setCustomValidity('');
        }

       
  }

  }
