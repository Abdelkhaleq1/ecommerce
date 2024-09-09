import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { Component } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandComponent } from './components/brand/brand.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';
import { DetalisComponent } from './components/detalis/detalis.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ShippingAddressComponent } from './components/shipping-address/shipping-address.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

export const routes: Routes = [
    {path:"", component:AuthLayoutComponent , canActivate:[loggedGuard],
        children:[
        {path:"", redirectTo:"login", pathMatch:"full"},
        {path:"login", component:LoginComponent},
        {path:"register" ,component:RegisterComponent},
        {path:"forget-password" ,component:ForgetPasswordComponent},

    ]},
  


    {path:"", component:BlankLayoutComponent, canActivate:[authGuard], children:[
        {path:"", redirectTo:"home" , pathMatch:"full"},
        {path:"home", component:HomeComponent},
        {path:"product" ,component:ProductComponent},
        {path:"cart" ,component:CartComponent},
        {path:"wishlist" ,component:WishlistComponent},
        {path:"brands" ,component:BrandComponent},
        {path:"categories" ,component:CategoriesComponent},
        {path:"details/:id" ,component:DetalisComponent},
        {path:"allorders" ,component:AllOrdersComponent},
        {path:"order/:id" ,component:ShippingAddressComponent},


    ]},
    {path:"**", component:NotfoundComponent}

];
