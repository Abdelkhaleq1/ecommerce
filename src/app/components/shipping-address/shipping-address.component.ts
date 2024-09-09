import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-shipping-address',
  standalone: true,
  imports: [ReactiveFormsModule],
templateUrl: './shipping-address.component.html',
  styleUrl: './shipping-address.component.scss'
})
export class ShippingAddressComponent implements OnInit {

  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly _OrdersService=inject(OrdersService)

  cartId:string|null=''

  shippingDetails:FormGroup = this._FormBuilder.group({
    details: [null ,[Validators.required]],
    phone: [null ,[Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]],

    city: [null ,[Validators.required ]]

  })
ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        this.cartId= p.get('id')
      }
    })
}

orderSubmit(){
this._OrdersService.CheckOut(this.cartId , this.shippingDetails.value).subscribe({
  next:(res)=>{
    console.log(res.session.url)
    window.open(res.session.url , "_self")
  },
  error:(err)=>{

  }
})
}

}
