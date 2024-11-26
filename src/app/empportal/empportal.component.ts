import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MyserviceService } from '../myservice.service';
import { FormsModule, NgForm, NgModel, NgModelGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empportal',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive,CommonModule,FormsModule],
  templateUrl: './empportal.component.html',
  styleUrl: './empportal.component.css'
})
export class EmpportalComponent {

  users: any[] = [];
  filteredUsers: any[] = [];
  currentUser: any = {};
  isModalOpen: boolean = false;
  roles: string[] = ['Employee', 'Manager'];

  constructor(private userService: MyserviceService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = data.filter((user) => user.role !== 'Admin');
      },
      error: (err) => console.error(err),
    });
  }

  openModal(user?: any): void {
    this.currentUser = user ? { ...user } : {};
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.currentUser = {};
  }

  saveUser(): void {
    this.currentUser.isactive = this.currentUser.isactive === 'true' || this.currentUser.isactive === true;
  
    const numericIds = this.users
      .map(user => parseInt(user.id, 10)) 
      .filter(id => !isNaN(id)); 
  
    const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0; 
    const newId = (maxId + 1).toString(); 
    if (this.currentUser.id) {
      this.userService.updateUser(this.currentUser.id, this.currentUser).subscribe({
        next: () => {
          this.loadUsers();
          this.closeModal();
        },
        error: (err) => console.error(err),
      });
    } else {
      this.currentUser.id = newId;
  
      this.userService.addUser(this.currentUser).subscribe({
        next: () => {
          this.loadUsers();
          this.closeModal();
        },
        error: (err) => console.error(err),
      });
    }
  }
  
  

  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => this.loadUsers(),
        error: (err) => console.error(err),
      });
    }
  }
  
  toggleUserStatus(user: any): void {
    user.isActive = !user.isActive; 
    this.userService.updateUser(user.id, { isActive: user.isActive }).subscribe({
      next: () => this.loadUsers(),
      error: (err) => console.error(err),
    });
  }
  



}
