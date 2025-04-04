import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class AppService {
  constructor(private http: HttpClient) { }

  getCMSLinks(): Observable<any> {
    return this.http.get(environment["baseUrl"]+"cms/active").pipe(map((response: any) => {return response }));
  }

  getCMSData(id): Observable<any> {
     return this.http.get(environment["baseUrl"]+"cms/"+id).pipe(map((response: any) => {return response }));
   }

   
 
}
