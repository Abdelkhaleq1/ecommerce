import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink , RouterLinkActive],
templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {
  readonly _auth = inject(AuthService)
  private readonly _CartService=inject(CartService)
  numOfItem:number=0

 

  

 
  ngOnInit(): void {
    this._CartService.getProductCart().subscribe({
      next:(res)=>{
        this._CartService.cartNumberOfProduct.next(res.numOfCartItems)

      }
    })
      this._CartService.cartNumberOfProduct.subscribe({
        next:(num)=>{
          this.numOfItem=num
        }
      })
  }
  
}
