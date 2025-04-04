import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {
  jwthelper = new JwtHelperService();
  constructor() { }

  isLoggedin() {
    let token = this.getToken();

    if (!token) return false;

    //let expirationDate=jwthelper.getTokenExpirationDate(token);
    let isExpired = this.jwthelper.isTokenExpired(token);
    if (isExpired) {
      localStorage.removeItem("pst");
    }
    return !isExpired;
    // return tokenNotExpired();
  }

  get currentUser() {
    let token = this.getToken();
    if (!token) return null;

    return this.jwthelper.decodeToken(token);
  }

  logOut() {
    localStorage.removeItem("pst");

  }

  getToken() {
    return localStorage.getItem("pst");
  }

}
