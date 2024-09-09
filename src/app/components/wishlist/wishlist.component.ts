import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { Iwishlist } from '../../core/interface/iwishlist';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe],
templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  private readonly _whislist=inject(WishlistService)
  private readonly _CartService=inject(CartService)
  private readonly _ToastrService=inject(ToastrService)



  wishListProduct:Iwishlist [] =[]


ngOnInit(): void {
    this._whislist.getwishlist().subscribe({
      next:(res)=>{
        console.log(res)
        this.wishListProduct = res.data
      },
      error:(err)=>{
        console.log(err)
      }
    })
}

removeItem(id:string){
  this._whislist.deleteItem(id).subscribe({
    next:(res)=>{
      this.wishListProduct = res.data
      console.log(res.data)


    },
    error:(err)=>{
      console.log(err)
    }
  })
}
addToCartW(id:string){
  this._CartService.addProductToCart(id).subscribe({
    next:(res)=>{
      console.log(res)
      this._ToastrService.success( res.message , 'FreshCart')
    },
    error:(err)=>{
      console.log(err)

    }
  })
}
}
