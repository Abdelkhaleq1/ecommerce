import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interface/iproduct';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalis',
  standalone: true,
  imports: [],
templateUrl: './detalis.component.html',
  styleUrl: './detalis.component.scss'
})
export class DetalisComponent implements OnInit{
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly _Product= inject(ProductsService)
  private readonly _CartService= inject(CartService)

  private readonly _ToastrService= inject(ToastrService)

  detailsProduct:Iproduct | null= null
  
  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(p)=>{
          let productId=p.get('id')
          this._Product.getSpecificProduct(productId).subscribe({
            next:(res)=>{
              console.log(res.data)
              this.detailsProduct = res.data
               },
            error:(err)=>{

            }
          })

        }
      })
  }

  addToCartD(id:string){
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
