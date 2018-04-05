import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes} from '@angular/router';
import {RouterModule} from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import { DisplayDataTableComponent } from './display-data-table/display-data-table.component'

const Routes: Routes = [
  {path: 'SignIn', component: SignInComponent},  
  {path: 'SignUp', component: SignUpComponent},
  {path: 'Profiles', component: DisplayDataTableComponent},
  {path: '', redirectTo: 'SignUp', pathMatch: 'full'},
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
