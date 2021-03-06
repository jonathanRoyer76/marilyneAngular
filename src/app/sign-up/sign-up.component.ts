import { Component, OnInit,  } from '@angular/core';
import { FormGroupDirective, NgForm } from '@angular/forms'
import { Location } from '@angular/common';
import { Personne } from '../classes/personne'
import { UsersDbService } from '../services/users-db.service'
import { ErrorsHandlerService } from '../errorsHandlers/errors-handler.service'
import { MatSnackBar, MatDatepicker, DateAdapter } from '@angular/material'
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
  // styleUrls: ['../../css/main.css']
})
export class SignUpComponent implements OnInit {
  personne       : Personne;  
  private fichier: File;
  myFormGroup    : FormGroup

  //Contrôleurs d'erreurs
  controlNom             = new FormControl('', [Validators.required])  
  controlPrenom          = new FormControl('', [Validators.required])
  controlPassword        = new FormControl('', [Validators.required, Validators.minLength(1)])
  controlConfirmPassword = new FormControl('', [Validators.required, Validators.minLength(1)])
  controlMail            = new FormControl('', [Validators.required, Validators.minLength(1), Validators.email])
  controlDateNaissance   = new FormControl('', [Validators.minLength(0)])
  controltelPortable     = new FormControl('', [Validators.pattern(/#^0[1-68]([-. ]?[0-9]{2}){4}$#/)])

  constructor(private location: Location, 
    private myDataBase      : UsersDbService,
    private httpErrorHandler: ErrorsHandlerService,
    private mySnackBar      : MatSnackBar,
    private adapter         : DateAdapter<any>
  ) {}

  ngOnInit() {
    this.adapter.setLocale('fr-FR')
    this.personne               = new Personne();
    this.personne.dateNaissance = new Date()
    this.myFormGroup            = new FormGroup({
      nom            : this.controlNom,
      prenom         : this.controlPrenom,
      password       : this.controlPassword,
      confirmPassword: this.controlConfirmPassword,
      mail           : this.controlMail,
      telPortable    : this.controltelPortable,
      dateNaissance  : new FormControl(), 
      adresse        : new FormControl('',[Validators.minLength(0)])
    })     
  }

  test(){
    console.log(this.personne.dateNaissance)
  }

  retour(){
    this.location.back();
  }

  validation(){
    this.myDataBase.signUp(this.personne).subscribe(data=>      
      {
        this.personne = data
        this.envoiFichier(data)
      }, err=>{
        console.log(err.error)
      });        
  }

  envoiFichier(data){
    this.mySnackBar.open('Utilisateur enregistré', 'Fermer', {
      duration: 2500
    })
    if (this.fichier!=undefined && this.personne.idPersonne!=undefined){
      this.myDataBase.envoiAvatar(this.fichier, this.personne.idPersonne.toString()).subscribe(data=>{}, err=>this.httpErrorHandler.modalHttpError(err));
    }
  }

  selectionFichier(event){
    this.fichier = event.target.files[0];    
  }
}