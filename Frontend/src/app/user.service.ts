// src/app/user.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<any>(null);

  constructor() {
    this.loadUser();
  }

  private loadUser() {
    const userData = localStorage.getItem('user');
    this.userSubject.next(userData ? JSON.parse(userData) : null);
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  setUser(user: any) {
    this.userSubject.next(user);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }
}
