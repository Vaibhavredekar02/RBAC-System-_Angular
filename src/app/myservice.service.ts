import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class MyserviceService {

  
    private apiUrl = 'http://localhost:3000/users'; 

 
    constructor(private http: HttpClient) {}
  
    getUsers(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl);
    }
  
    addUser(user: any): Observable<any> {
      return this.http.post<any>(this.apiUrl, user);
    }
  
    updateUser(id: string, user: any): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/${id}`, user);
    }
  
    deleteUser(id: string): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

    
  private getLoggedInUser(): any {
    return JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  }

    isLoggedIn(): boolean {
      return !!localStorage.getItem('loggedInUser');
    }

    isAdmin(): boolean {
      const user = this.getLoggedInUser();
      return user?.role === 'Admin';
    }

    isEmployee(): boolean {
      const user = this.getLoggedInUser();
      return user?.role === 'Employee';
    }

    isManager(): boolean {
      const user = this.getLoggedInUser();
      return user?.role === 'Manager';
    }

    logout(): void {
      localStorage.removeItem('loggedInUser');
    }
  }
