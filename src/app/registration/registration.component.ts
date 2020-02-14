import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,   
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.email],
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordAgain: ['', Validators.required]
    });
  }

  async onSubmit() {
    console.log('OOOK', this.form.value);
  }

}
