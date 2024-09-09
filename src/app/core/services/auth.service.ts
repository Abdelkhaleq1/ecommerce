import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private readonly _HttpClient = inject(HttpClient)
 private readonly _router=inject(Router)
userDate:any= null;

  
 setRegiserForm(data:object):Observable<any>
 {
 return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup` , data)
 }

 setLoginForm(data:object):Observable<any>
 {
 return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin` , data)
 }

 saveDate(){
  if(localStorage.getItem('userToken') !== null){
   this.userDate= jwtDecode(localStorage.getItem('userToken') !)
  }
  
 }

 forgetPass(data:object):Observable<any>
 {
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords` , data)
 }



 
 verifyCode(data:object):Observable<any>
 {
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode` , data)
 }



 resetPass(data:object):Observable<any>
 {
  return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword` , data)
 }
 




 logOut():void{
  localStorage.removeItem('userToken')
  this.userDate= null;
  //call api if there is
  this._router.navigate(['/login'])
 }
}






