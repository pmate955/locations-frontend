import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MapComponent} from './map/map.component'
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './helpers/auth.guard';
import { RegistrationComponent } from './registration/registration.component';


const routes: Routes = [
  {path: '', component: WelcomeComponent},  
  {path: 'login', component: LoginComponent},
  {path: 'map', component: MapComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegistrationComponent}, 
  {path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
