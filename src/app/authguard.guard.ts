import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const authguardGuard: CanActivateFn = (route, state) => {

  const service = inject(AuthService);
  const router = inject(Router);

  if(service.loggedIn) {
    return true;
  }
  else {
    router.navigate(['']);
    return false;
  }

};
