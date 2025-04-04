import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class AdminService {
  constructor(private http: HttpClient) { }

  login(body): Observable<any> {
    return this.http.post(environment["baseUrl"]+"users/login", body);
  }
  upload(body): Observable<any> {
    return this.http.post(environment["baseUrl"]+"model/upload", body);
  }
}
