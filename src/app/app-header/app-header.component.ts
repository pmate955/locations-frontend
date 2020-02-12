import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
  loggedIn: boolean;
  userName: string;
  subscription: any;

  constructor(private authService: AuthenticationService) {
    this.userName = '';
    this.loggedIn = false;
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnInit() {
    console.log('INIT', this.authService.getLoggedInName)
    this.subscription = this.authService.getLoggedInName.subscribe((name) => {
      if(name != '') {
        this.loggedIn = true;
        this.userName = name;
      } else {
        this.loggedIn = false;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
