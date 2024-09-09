import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { subscribe } from 'diagnostics_channel';
import { Icart } from '../../core/interface/icart';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe , RouterLink],
templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
private readonly _CartService= inject(CartService)
private readonly _ToastrService= inject(ToastrService)
private readonly _ActivatedRoute= inject(ActivatedRoute)




cartProducts:Icart = {} as Icart

ngOnInit(): void {
    this._CartService.getProductCart().subscribe({
      next:(res)=>{
        console.log(res)
        this._CartService.cartNumberOfProduct.next(res.numOfCartItems)
        this.cartProducts=res.data
      },
      error:(err)=>{
        console.log(err)

      }
    })
}

deleteSpcificItemCart(id:string){
  this._CartService.deleteSpcificProduct(id).subscribe({
    next:(res)=>{
      console.log(res)
      this.cartProducts=res.data
      this._CartService.cartNumberOfProduct.next(res.numOfCartItems)
    },
    error:(err)=>{
      console.log(err)
    }
  })
}

updateQuantity(id:string , count:number){

  if(count > 0){
 this._CartService.upadateCartProductQ(id, count).subscribe({
    next:(res)=>{
      this.cartProducts = res.data;
      console.log(res)
      this._ToastrService.success("Done!" , 'FreshCart')
    },
    error:(err)=>{

    }
  })
  }
 
}


clearAll(){
  this._CartService.clearCart().subscribe({
    next:(res)=>{

      if(res.message == "success"){
        this.cartProducts = {} as Icart
        this._CartService.cartNumberOfProduct.next(0)
      }
    },
    error:(err)=>{

    }
  })
}
}
