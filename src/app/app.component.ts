import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from './services/auth.service';
import { User } from './models/user';
import { Router } from '@angular/router';
import { ApiCommunicationService } from './shared/api-communication-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faCoffee = faCoffee;
  title = 'locations-frontend';
  currentUser: User;
  
  constructor( private router: Router,
    private authenticationService: AuthenticationService, private apiCommunicationService: ApiCommunicationService) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }
  

}
