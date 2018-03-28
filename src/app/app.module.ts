import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { UsersDbService } from './users-db.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { TokenInterceptor } from './tokenInterceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatIconModule,
  MatInputModule, MatSidenavModule, MatCardModule, MatDividerModule
       } from '@angular/material'

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatCardModule,
    MatDividerModule,   
    MatMenuModule,
    MatIconModule,
    MatInputModule,
  ],
  providers: [UsersDbService,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
