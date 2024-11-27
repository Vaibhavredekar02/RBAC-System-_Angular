import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,RouterOutlet,RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private myService: MyserviceService, private router: Router) {}
  login() {
    this.myService.getUsers().subscribe(
      (users) => {
        const user = users.find(
          (u) => u.email === this.username && u.password === this.password
        );
  
        if (user) {
          localStorage.setItem('loggedInUser', JSON.stringify(user));
  
          // Navigate based on user role
          if (user.role === 'Admin') {
            this.router.navigate(['/admindash']);
          } else if (user.role === 'Employee') {
            this.router.navigate(['/employeedash']);
          } else if (user.role === 'Manager') {
            this.router.navigate(['/managerdash']);
          }
        } else {
          this.errorMessage = 'Invalid email or password.';
        }
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.errorMessage = 'Server error. Please try again later.';
      }
    );
  }
  

 

}
