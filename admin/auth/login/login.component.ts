import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';
import { AuthHelperService } from '../../../services/admin/authHelper.service';
import { untilDestroyed } from "ngx-take-until-destroy";

@Component({
  selector: 'app-body',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class AdminLoginComponent implements OnInit {
  public showPassword: boolean = false;
  body = {email: '',password: ''};
  isHidden = true;
  constructor(private auth: AuthHelperService, private adminService: AdminService, private rout:Router) {
    if (this.auth.isLoggedin()) {
      rout.navigate(['admin']);
    }

  }

  ngOnInit() {
  }
  
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  errors=[];
  login() {
    const password = document.getElementById('password1') as HTMLInputElement;
    
    if(password.value.length < 6){
      password.setCustomValidity('password must be 6 character');
    }else{
    if (this.body.email && this.body.password) {
      this.adminService.login(this.body).subscribe((res) => {
        // console.log("res///////",res.user);
        localStorage.setItem('pst', res.token);
        localStorage.setItem('user', res.user);
        this.rout.navigate(['admin/model']);
      }, err => {
        this.errors = err.error.message;
      })
    }
  }
  }

  ngOnDestroy() {}
 
  


}
