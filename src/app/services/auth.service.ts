import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  public login(): void {
    console.log('item id');
  }

  public logout(): void {
    console.log('course created');
  }

  public isAuthenticated(): void {
    console.log('item id');
  }

  public getUserInfo(): void {
    console.log('item is updated');
  }
}
