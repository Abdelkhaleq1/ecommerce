import { Component, inject, model, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interface/iproduct';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink ,SearchPipe ,FormsModule],
templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  private readonly _product=inject(ProductsService)
  private readonly _CartService=inject(CartService)
  private readonly _ToastrService=inject(ToastrService)
  private readonly _WishlistService=inject(WishlistService)


  allProducts:Iproduct []=[]
  text:string=''

ngOnInit(): void {
    this._product.getProducts().subscribe({
      next:(res)=>{
        console.log(res)
        this.allProducts=res.data
      },
      error:(err)=>{
        console.log(err)
      }
    })
}


addToCart(id:string){
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
addToWishlist(id:string){
  this. _WishlistService.addProductToWish(id).subscribe({
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
