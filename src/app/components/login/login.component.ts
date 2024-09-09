import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { emit } from 'process';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , RouterLink],
templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy{
private readonly _formbuilder= inject(FormBuilder)
private readonly _authservice=inject(AuthService)
private readonly _router= inject(Router)


loginsub!:Subscription

isLoading:boolean=false;
// isPageLoading:boolean=false;
msgError:boolean=false;

loginform:FormGroup=this._formbuilder.group({
email:[null , [Validators.email , Validators.required]],
password:[null ,[Validators.required , Validators.pattern(/^\w{6,}$/)]]
})

loginSubmit(){
if(this.loginform.valid){
  this.isLoading=true;
this._authservice.setLoginForm(this.loginform.value).subscribe({
  next:(res)=>{

    // this.isPageLoading=true;
    if (res.message == "success") {
       setTimeout(() => {
      localStorage.setItem('userToken' , res.token)
      this._authservice.saveDate()
      this._router.navigate(['/home'])
    }, 600);
    }
   
  },
  error:(err:HttpErrorResponse)=>{
    this.msgError= err.error.message
    this.isLoading=false;

  }
})
}
else{
  this.loginform.markAllAsTouched()
}
}
ngOnDestroy(): void {
  this.loginsub?.unsubscribe
  
}
}
