import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { error } from 'console';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {

  private readonly _authservice= inject(AuthService)
  private readonly _formBuilder= inject(FormBuilder)
  private readonly _router= inject(Router)


  msgError:string="";
  isLoading:boolean=false;
  // isPageLoading:boolean=false;
  registerSub!:Subscription;
  


  registerForm:FormGroup= this._formBuilder.group({
    name:[null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]],
    email:[null , [Validators.required , Validators.email]],
    phone  :[null,  [Validators.pattern(/^01[0125][0-9]{8}$/) ,Validators.required]],
    password:[null , [Validators.required , Validators.pattern(/^\w{6,}$/)]],
    rePassword:[null ]
  } , {validators: this.passwordConfirmation})




  // registerForm:FormGroup= new FormGroup({

  //   name  :new FormControl(null, [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
  //   email :new FormControl(null , [Validators.required , Validators.email]),
  //   phone  :new FormControl(null ,  [Validators.pattern(/^01[0125][0-9]{8}$/) ,Validators.required]),
  //   password :new FormControl(null, [Validators.required , Validators.pattern(/^\w{6,}$/)]),
  //   rePassword:new FormControl(null)

  // } , this.passwordConfirmation)


registerSubmit():void{
  this.isLoading=true;
  if(this.registerForm.valid){
    this._authservice.setRegiserForm(this.registerForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        this.isLoading=false;
        if(res.message == "success"){
          // this.isPageLoading=true
          setTimeout(() => {
           
            this._router.navigate(["/login"])
          }, 700);
          
        }
        

      },
      error:(err:HttpErrorResponse)=>{
        this.msgError = err.error.message
        console.log(err)
        this.isLoading=false;

      }

    })
  }
  else{
    this.registerForm.setErrors({mismatch:true})
    this.registerForm.markAllAsTouched();
    this.isLoading=false;

  }
}

passwordConfirmation(g:AbstractControl)
{
  if(g.get("password")?.value === g.get("rePassword")?.value){
    return null
  }
 else
 return {mismatch:true}
}
ngOnDestroy(): void {
  this.registerSub?.unsubscribe
  
}


}
