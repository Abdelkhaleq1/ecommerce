import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interface/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interface/icategory';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule , RouterLink , SearchPipe ,FormsModule , NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly _products=inject(ProductsService)
  private readonly _Category=inject(CategoriesService)

  private readonly _CartService=inject(CartService)
  private readonly _Wishlist=inject(WishlistService)

  private readonly _ToastrService=inject(ToastrService)



islike:boolean=false

productList:Iproduct[]=[]
categoryList:Icategory[]=[]
text:string = "";

customOptionsMain: OwlOptions = {
  loop: true,
  autoplay:true,
  autoplayTimeout:3000,
  autoplayHoverPause:true,
  mouseDrag: true,
  touchDrag: false,
  pullDrag: false,
  dots:true,
  navSpeed: 700,
  navText: ['next', 'prev'],
  nav: true,
items:3,

}


customOptionsCat: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: false,
  pullDrag: false,
  dots: true,
  autoplay:true,
  autoplayTimeout:3000,
  autoplayHoverPause:true,
  navSpeed: 700,
  navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 1
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  },
  nav: true
}

  ngOnInit() {


    this._Category.getAllCategories().subscribe({
      next:(res)=>{
        console.log("cat" ,res.data)
        this.categoryList=res.data
      },
      error:(err)=>{
        console.log(err)
      }
    })
   
     this._products.getProducts().subscribe({
       next:(res)=>{
         console.log(res.data, 'products')
         this.productList=res.data
         
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
      this._CartService.cartNumberOfProduct.next(res.numOfCartItems)
    },
    error:(err)=>{
      console.log(err)

    }
  })
}
addToWishlist(id:string){
  this._Wishlist.addProductToWish(id).subscribe({
    next:(res)=>{
      this.islike=true
      console.log(res)
      this._ToastrService.success( res.message , 'FreshCart')
    },
    error:(err)=>{
      console.log(err)

    }
  })
}
}
