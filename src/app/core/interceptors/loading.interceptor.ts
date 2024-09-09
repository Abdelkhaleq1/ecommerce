import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const _NgxSpinnerComponent=inject(NgxSpinnerService)

  _NgxSpinnerComponent.show()
  return next(req).pipe(finalize(()=>{
    _NgxSpinnerComponent.hide()

  }));
};
