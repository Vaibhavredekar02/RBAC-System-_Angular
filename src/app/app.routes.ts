import { Routes } from '@angular/router';
import { AboutmoduleComponent } from './aboutmodule/aboutmodule.component';
import { EmpportalComponent } from './empportal/empportal.component';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { EmployeeDashComponent } from './employee-dash/employee-dash.component';
import { HomeComponent } from './home/home.component';
import { ManagerDashComponent } from './manager-dash/manager-dash.component';

export const routes: Routes = 
  [
    {path:'admindash',component:AdminDashComponent},
    {path:'about',component:AboutmoduleComponent},
    {path:'login',component:LoginComponent},
    {path:'employeeportal',component:EmpportalComponent},
    {path:'employeedash',component:EmployeeDashComponent},
    {path:'home',component:HomeComponent},
    {path:'managerdash',component:ManagerDashComponent},

    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'**',component:NopageFoundComponent}

  ];











