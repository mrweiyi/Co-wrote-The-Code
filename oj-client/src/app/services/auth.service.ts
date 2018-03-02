import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  // Configure Auth0
  clientId: string = 'WOL3FLYnZ0SkkWOVH1uTdU-_YLPR6PNT';
  domain: string = 'paysoncs50317021.auth0.com';
  lock = new Auth0Lock(this.clientId, this.domain, {});

  constructor(private router: Router) {
  }

  public login() {
    // Call the show method to display the widget.
    // this.lock.show();
    return new Promise((resolve, reject) => {
      this.lock.show((error: string, profile: Object, id_token: string) => {
        if (error) {
          reject(error);
        } else {
          localStorage.setItem('profile', JSON.stringify(profile));
          localStorage.setItem('id_token', id_token);
          resolve(profile);
        }
      })
    })
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired('id_token');
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.router.navigate(['/']);
  }

  public getProfile(): Object {
    return JSON.parse(localStorage.getItem('profile'));
  }
}