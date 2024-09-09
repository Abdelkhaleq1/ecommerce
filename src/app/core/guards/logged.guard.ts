import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedGuard: CanActivateFn = (route, state) => {

  const _router=inject(Router)
  const _platform_ID = inject(PLATFORM_ID)

  if (isPlatformBrowser(_platform_ID)) {
    if (localStorage.getItem('userToken') !== null ) {
    _router.navigate(['/home'])
    return false
    
  }
  else{
    return true
    
  }
  }
  else{
    return false
  }
  
};
