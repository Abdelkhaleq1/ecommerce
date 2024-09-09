import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { AuthService } from '../../core/services/auth.service';
import { Iallorder } from '../../core/interface/iallorders';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent implements OnInit  {
private readonly _OrdersService=inject(OrdersService)
private readonly _auth=inject(AuthService)

token : any ={token : localStorage.getItem('userToken')}
userData:any
orderDetails:Iallorder ={} as Iallorder;

ngOnInit(): void {
  this._auth.saveDate()
  this.userData=this._auth.userDate
  this._OrdersService.getUserOrder(this._auth.userDate.id).subscribe({
    next:(res)=>{
      console.log("arryaaaaaaaaaaaaaaaaaaaaaaaa",res)
      this.orderDetails=res
      console.log("this", this.orderDetails)

    },
    error:(err)=>{
      console.log(err)
  
    }
  })
}
 }



