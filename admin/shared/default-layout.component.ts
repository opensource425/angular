
import { Component } from '@angular/core';
import { navItems, navItemsSubadmin } from '../_nav';
import { Router } from '@angular/router';
import { AuthHelperService } from '../../services/admin/authHelper.service';
import { TranslateService } from '@ngx-translate/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})

export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems;
  public username;
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  constructor(private authS: AuthHelperService, private rout:Router, public translate: TranslateService) { 
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');

    // console.log(this.user);
    let user = this.authS.currentUser;
    this.username = user.name;
    if(user.admin==true)
      this.navItems = navItems;
    else
      this.navItems = navItemsSubadmin;  


  }

  logOut() {
    this.authS.logOut();
    this.rout.navigate(['/admin/login']);
  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }
}

