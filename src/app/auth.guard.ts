import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyserviceService } from './myservice.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(MyserviceService); 
  const router = inject(Router); 
  const toastr = inject(ToastrService); 

  // Check if the user is logged in
  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  // Menu-specific checks
  const menu = route.url[0]?.path;

  if (menu) {
    if (menu === 'admindash' && !authService.isAdmin()) {
      toastr.warning('You don\'t have access to this page.');
      router.navigate(['/']);
      return false;
    }

    if (menu === 'employeeportal' && !authService.isEmployee()) {
      toastr.warning('You don\'t have access to this page.');
      router.navigate(['/']);
      return false;
    }

    if (menu === 'managerdash' && !authService.isManager()) {
      toastr.warning('You don\'t have access to this page.');
      router.navigate(['/']);
      return false;
    }
  }

  // If passed all checks
  return true;
};
