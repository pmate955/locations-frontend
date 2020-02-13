import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth.service';

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
    this.authService.currentUser.subscribe(newUser => {
      if(newUser){
        this.userName = newUser.username;
      }
      this.loggedIn = this.userName !== '';
    })
    if(this.authService.currentUserValue){
      this.userName = authService.currentUserValue.username;
    }
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
