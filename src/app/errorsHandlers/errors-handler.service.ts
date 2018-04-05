import { Injectable, Component, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@Injectable()
export class ErrorsHandlerService {

  constructor(public myModalDialog: MatDialog) { }

  modalHttpError(err: HttpErrorResponse){
    this.myModalDialog.open(modalHttpErrorHandler, {
      data: {
        titre: 'Erreur réseau',        
        // message: err.message,
        status: err.status,
        url: err.url,
        statustext: err.statusText,
        // headers: err.headers,
        error: err.error['Erreur']
      }  
    })
  }
}

@Component({
  selector: 'modalHttpErrorHandler',
  templateUrl: 'modalHttpErrorHandler.html',
})
export class modalHttpErrorHandler{

  titre: string
  // message: string;
  status: number;
  url: string
  statustext: string
  // headers: any
  error : any

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    // this.message    = data['message'];
    this.titre      = data['titre']
    this.status     = data['status']
    this.url        = data['url'];
    this.statustext = data['statustext'];
    // this.headers    = data['headers'];
    this.error      = data['error'];
   }
}