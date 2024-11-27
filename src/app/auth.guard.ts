import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyserviceService } from './myservice.service';



export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(MyserviceService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  const menu = route.url.length > 0 ? route.url[0].path : null;

  const hasAccess = (roleCheckFn: () => boolean): boolean => {
    if (!roleCheckFn()) {
      toastr.warning('You don\'t have access to this page.');
      router.navigate(['/']);
      return false;
    }
    return true;
  };

  if (menu === 'admindash' && !hasAccess(authService.isAdmin)) return false;
  if (menu === 'employeeportal' && !hasAccess(authService.isEmployee)) return false;
  if (menu === 'managerdash' && !hasAccess(authService.isManager)) return false;

  return true;


  
};