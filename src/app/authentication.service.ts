import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private token: string;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private server: ServerService) {
    console.log('Auth Service');
    const userData = localStorage.getItem('user');
    if (userData) {
      console.log('Logged in from memory');
      const user = JSON.parse(userData);
      this.token = user.token;
      this.server.setLoggedIn(true, this.token);
      this.loggedIn.next(true);
    }
  }

  login(user) {
    if (user.username !== '' && user.password !== '' ) {
      return this.server.request('POST', '/sessions/new', {
        username: user.username,
        password: user.password
      }).subscribe((response: any) => {
        console.log(response)
        if (response.token !== undefined) {
          this.token = response.token;
          this.server.setLoggedIn(true, this.token);
          this.loggedIn.next(true);
          const userData = {
            token: this.token,
          };
          localStorage.setItem('user', JSON.stringify(userData));
          this.router.navigateByUrl('/map');
        }
      });
    }
  }

  logout() {
    this.server.setLoggedIn(false);
    delete this.token;

    this.loggedIn.next(false);
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
