import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import path from 'node:path';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  private readonly _formbuilder=inject(FormBuilder)
  private readonly _authservice=inject(AuthService)
  private readonly _router=inject(Router)
  step:number=1;

verifyEmail:FormGroup=this._formbuilder.group({
  email:[null , [Validators.email , Validators.required]]
})


verifyCode:FormGroup=this._formbuilder.group({
  resetCode:[null , [Validators.pattern(/^[0-9]{5,6}$/) , Validators.required]]
})




resetPass:FormGroup=this._formbuilder.group({
  email:[null , [Validators.email , Validators.required]],

 newPassword: [ null,  [Validators.required , Validators.pattern(/^\w{6,}$/)]]
})



setVerifyEmail(){

    let emailValue = this.verifyEmail.get("email")?.value;
    this.resetPass.get("email")?.patchValue(emailValue)

  this._authservice.forgetPass(this.verifyEmail.value).subscribe({
    next:(res)=>{
      console.log(res)
      if(res.statusMsg == 'success'){
        this.step = 2;
      }
    },
    error:(err)=>{
      console.log(err)
     

    }
  })
}




setVerifyCode(){

  this._authservice.verifyCode(this.verifyCode.value).subscribe({
    next:(res)=>{
      console.log(res)
      if(res.status == 'Success'){
        this.step = 3;
        
      }
    },
    error:(err:HttpErrorResponse)=>{
      console.log(err.error , err.message)
     

    }
  })
}

setNewPass(){
  this._authservice.resetPass(this.resetPass.value).subscribe({
    next:(res)=>{
      console.log(res)

      localStorage.setItem("userToken" , res.token)
      this._authservice.saveDate()
      this._router.navigate(['/home'])
      
    },
    error:(err)=>{
      console.log(err)
     

    }
  })
}

}
