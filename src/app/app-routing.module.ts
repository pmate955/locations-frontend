import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MapComponent} from './map/map.component'


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'map'},  
  {path: 'login', component: LoginComponent},
  {path: 'map', component: MapComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
