import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Token } from '@angular/compiler';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {


cartId:string|null='';
private readonly _HttpClient=inject(HttpClient)
myheaders :any = {token : localStorage.getItem("userToken")}


CheckOut(CartId:string|null , shippingAddress:object):Observable<any>
{
  this.cartId=CartId
 return  this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${CartId}?url=${environment.urlServer}`, 
    {
      "shippingAddress":shippingAddress
    }, {
      headers : this.myheaders
    }
  )
}

getUserOrder(CartId:string|null):Observable<any>
{
return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${CartId}`)
}
}
