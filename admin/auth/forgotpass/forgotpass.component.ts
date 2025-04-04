import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthHelperService } from '../../../services/admin/authHelper.service';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss']
})
export class ForgotpassComponent implements OnInit {
  email=""
  constructor(private auth: AuthHelperService, private http: HttpClient, private router: Router,private toastr: ToastrService) { 
    if (this.auth.isLoggedin()) {
      router.navigate(['admin']);
    }
  }

  ngOnInit(): void {
  }

  forgotPassword(){
    // CHECK EMAIL 
    this.http.post(environment["baseUrl"] + "users/reset-password", { email: this.email }).subscribe(data => {
      if(data['status']){
          this.toastr.success(data['message'], 'Success!', {
            timeOut: 3000,
          });
          this.router.navigate(['admin']);
       } else{
        this.toastr.error(data['message'], 'Error', {
          timeOut: 3000,
        });
      }
    })
  }
}
