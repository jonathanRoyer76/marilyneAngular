import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { SignInComponent, modalSignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ModifProfilComponent } from './modif-profil/modif-profil.component'
import { SideNavComponent } from './side-nav/side-nav.component';

import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { UsersDbService } from './users-db.service';
import { ErrorsHandlerService, modalHttpErrorHandler } from './errorsHandlers/errors-handler.service'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { TokenInterceptor } from './tokenInterceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatIconModule, MatDialogModule,
  MatInputModule, MatSidenavModule, MatCardModule, MatDividerModule, MatExpansionModule,
  MatSnackBarModule, MatSelectModule, MatSelect, MatTableModule,
       } from '@angular/material';
import { DisplayDataTableComponent } from './display-data-table/display-data-table.component';
import { ContratComponent } from './contrat/contrat.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent, 
    modalSignInComponent, 
    modalHttpErrorHandler, 
    ModifProfilComponent, 
    SideNavComponent, DisplayDataTableComponent, ContratComponent,
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
    MatExpansionModule,
    MatDialogModule,
    MatSnackBarModule,    
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
  ],
  providers: [UsersDbService,
    ErrorsHandlerService,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  entryComponents: [
    modalSignInComponent,
    modalHttpErrorHandler,
    ModifProfilComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
