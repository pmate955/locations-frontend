import { Component, OnInit } from '@angular/core';
import { ApiCommunicationService } from '../shared/api-communication-service';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthenticationService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  public user$: Observable<User>;

  constructor(private api: ApiCommunicationService, private auth: AuthenticationService) {
    this.user$ = this.api.user().getOneUserById(`${this.auth.currentUserValue.id}`);
   }

  ngOnInit() {
  }

}
