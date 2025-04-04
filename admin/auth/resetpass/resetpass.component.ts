import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType } from "@angular/common/http";
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.scss']
})
export class ResetpassComponent implements OnInit {
  ResponseResetForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  resetToken: null;
  CurrentState: any;
  IsResetFormValid = true;
  newPassword="";

  constructor( private http: HttpClient, private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder, private toastr: ToastrService) { 
      this.CurrentState = 'Wait';
      this.route.params.subscribe(params => {
      this.resetToken = params.token;
      console.log(this.resetToken);
      this.VerifyToken();
    });

    }

  ngOnInit(): void {
    // this.Init();
  }

 
  VerifyToken() {
    this.http.post(environment["baseUrl"] + "users/password-token", { resettoken: this.resetToken }).subscribe(data => {
      if(data['status']){
        this.CurrentState = 'Verified';
        
       } else{
        this.CurrentState = 'NotVerified';
       
      }
    })
  }

  ResetPassword(form) {
    // if (form.valid) {
      this.IsResetFormValid = true;
      this.http.post(environment["baseUrl"] + "users/new-password", {newPassword: this.newPassword, resettoken: this.resetToken}).subscribe(data => {
        if(data['status']){
          this.toastr.success(data['message'], 'Success!', {
              timeOut: 3000,
            });
            this.router.navigate(['admin']);

         } else{
          this.toastr.error(data['message'], 'Error!', {
            timeOut: 3000,
          });
         
        }
      })
  }

 

  onChange(event) {

    const password1 = document.getElementById('password') as HTMLInputElement;
    const password2 = document.getElementById('cpassword') as HTMLInputElement;
    if(password1.value != password2.value){
      password2.setCustomValidity('Password & Confirm Password must match');
    }
    else {
      password2.setCustomValidity('');
    }
  }
}
