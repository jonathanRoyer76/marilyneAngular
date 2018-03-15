import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes} from '@angular/router';
import {RouterModule} from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';

const Routes: Routes = [
  {path: 'SignIn', component: SignInComponent},  
  {path: 'SignUp', component: SignUpComponent},
  {path: '', redirectTo: 'SignIn', pathMatch: 'full'},
]

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forRoot(Routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
