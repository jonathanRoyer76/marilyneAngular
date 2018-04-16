import { Component, OnInit, ElementRef, ViewChild, 
  Inject, Input, Output, EventEmitter } from '@angular/core';
import { Personne } from '../classes/personne'
import { UsersDbService } from '../services/users-db.service'
import { ErrorsHandlerService } from '../errorsHandlers/errors-handler.service'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable} from 'rxjs/Observable'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { SignUpComponent } from '../sign-up/sign-up.component'

@Component({
  selector   : 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [UsersDbService]
})
export class SignInComponent implements OnInit {
  @Input() personne: Personne;
  @Output() personneChange = new EventEmitter<Personne>();
  isConnected: boolean;
  //Représente le contrôle '#avatar' dans le template
  @ViewChild("avatar") avatar: ElementRef;

  constructor(private myDataBase: UsersDbService, 
    private myHttpErrorHandler: ErrorsHandlerService,
    private http: HttpClient,
    public modalSignIn: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  test(){
    this.myDataBase.getProfiles().subscribe(data=>{console.log(data)}, err=>{console.log(err.error)})
  }

  ngOnInit() {
    this.personne       = new Personne();    
    let token = localStorage.getItem('authorization')    
    if (token!=undefined && token!=''){
      this.isConnected    = true;
      this.personne.token = token;
      this.getProfile();
      this.getAvatar();
    }else{
      this.isConnected    = false;
      this.personne.libelleCategorie = 'visiteur';
    }    
  }

  Deconnexion(){
    this.personne.idPersonne       = 0
    this.personne.nom              = ''
    this.personne.prenom           = ''
    this.personne.password         = ''
    this.personne.dateNaissance    = null
    this.personne.adresse          = ''
    this.personne.telPortable      = ''
    this.personne.mail             = ''
    this.personne.actif            = ''
    this.personne.id_Categorie     = 0
    this.personne.token            = ''
    this.personne.libelleCategorie = ''
    this.personne.avatar           = ''
    localStorage.setItem('authorization', '')
    this.isConnected=false;
    this.personneChange.emit(this.personne);
  }

  Connexion(){
    this.myDataBase.signIn(this.personne).subscribe(retour => {
      this.personne = retour
      this.connected()
    },
      err=>this.myHttpErrorHandler.modalHttpError(err));
  }

  getProfile(){
    this.myDataBase.getProfile(this.personne).subscribe(retour=>{
      this.personne = retour
      this.personneChange.emit(this.personne)
      this.snackBar.open("Bienvenue " + this.personne.prenom + '.', 'Fermer', {
        duration: 2500
      })
    }, err=>this.myHttpErrorHandler.modalHttpError(err))  
  }

  getAvatar(){
    this.myDataBase.getAvatar().subscribe(
      blob=>{
        this.avatar.nativeElement.src = window.URL.createObjectURL(blob)
      }
    ), err=>this.myHttpErrorHandler.modalHttpError(err)    
  }

  private connected(){
    localStorage.setItem('authorization', this.personne.token)
    this.isConnected=true;
    this.personneChange.emit(this.personne)
    this.getAvatar();
    this.snackBar.open("Bienvenue " + this.personne.prenom + '.', 'Fermer', {
      duration: 2500
    })
  }
}

@Component({
  selector: 'modalSignIn',
  templateUrl: 'modalSignIn.html',
})
export class modalSignInComponent{

  titre: string
  message: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.message    = data['message'];
    this.titre      = data['titre']
   }
}