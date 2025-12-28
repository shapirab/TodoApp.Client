import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';

export const todoGuard: CanActivateFn = (route, state) => {
  let accountService = inject(AccountService);
  let router = inject(Router);

  if(accountService.currentUser()){
    return true;
  }
  router.navigateByUrl('/login')
  return false;
};
