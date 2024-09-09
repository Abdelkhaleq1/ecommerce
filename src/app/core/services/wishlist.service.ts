import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
private readonly _HttpClient=inject(HttpClient)

myheader:any = {token : localStorage.getItem("userToken")}

addProductToWish(id:string):Observable<any>
{
return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist` , 
  {
     "productId": id
  },
  
  {
    headers :this.myheader
  }
)
}

getwishlist():Observable<any>
{
return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`, 
  {
    headers: this.myheader
  }
)
}

deleteItem(id:string):Observable<any>
{
  return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`,
    {
      headers : this.myheader
    }
  )
}
}
