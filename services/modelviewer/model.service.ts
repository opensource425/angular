
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map , catchError,tap  } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class ModelService {
  public errorMsg
  constructor(private http: HttpClient) { }
  
  getModelById(Id:String): Observable<any> {
    try{
      return this.http.get(environment["baseUrl"]+"model/main/"+Id).pipe(map((response: any) => {return response }));
    }catch(error){
      this.handleError(error);
     }  
    }

  getModel(): Observable<any> {
    try{
      return this.http.get(environment["baseUrl"]+"model/active/").pipe(map((response: any) => {return response })); 
    }catch(error){
      this.handleError(error);
   }  
  }

   fileExistsInModel(url:string): Observable<any> { 
     try{
        return this.http.get(url,{responseType: 'text'}).pipe(map((response: any) => {return [{'isFile':true}] }),catchError(error => {
          if (error.error instanceof ErrorEvent) {
              this.errorMsg = `Error: ${error.error.message}`;
          } else {
              this.errorMsg = `Error: ${error.message}`;
          }
          return [{'isFile':false}]
        }));
     }catch(error){
      this.handleError(error);
     }
   }
 
    handleError(error) {
    const unwrappedError = error && typeof error.json === 'function'
      ? error.json() 
      : error;
    throw unwrappedError;
  }
  
  delete(Id:String): Observable<any> {
    return this.http.delete(environment["baseUrl"]+"model/main/"+Id).pipe(map((response: any) => {return response }));
 }
  // delete(id: any): Observable<void> {
  //   return this.http.delete<void>(`${this.getUrl}/${id}`)
  // }

}

