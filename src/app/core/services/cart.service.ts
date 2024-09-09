import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly _HttpClient=inject(HttpClient)

  cartid:string='';
  
  cartNumberOfProduct:BehaviorSubject<number> = new BehaviorSubject(0)

  myheaders:any ={token: localStorage.getItem("userToken")}
  
  addProductToCart(id:string):Observable<any>
  {
    
  return  this._HttpClient.post(`${environment.baseUrl}/api/v1/cart` ,

      {
        "productId": id
      },
      {
        headers : this.myheaders
      }
    )
  }


  getProductCart():Observable<any>
  {
   return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`, 

      {

       headers:this.myheaders 
      }
    )
  }

  deleteSpcificProduct(id:string):Observable<any>
  {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}` ,
      {
        headers : this.myheaders
      }
    )
  }



  upadateCartProductQ(id:string , newCount:number ):Observable<any>
  {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`, 
      {
        "count": newCount

      },
      {
        headers:this.myheaders
      }
    )
  }



  clearCart():Observable<any>
  {
   return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`
      ,
      {
        headers:this.myheaders
      }
    )
  }
}
