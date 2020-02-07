import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css'],
  providers: [AuthenticationService]
})
export class AppHeaderComponent implements OnInit {

  constructor(private authService: AuthenticationService) {}

  onLogout() {
    this.authService.logout();
  }

  ngOnInit() {
  }

}
