import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { Personne } from '../personne'
import { UsersDbService } from '../users-db.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable} from 'rxjs/Observable'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector   : 'app-sign-in',
  templateUrl: './sign-in.component.html',
  // styleUrls  : ['./sign-in.component.css','../../css/main.css'],
  styleUrls: ['./sign-in.component.css'],
  providers: [UsersDbService]
})
export class SignInComponent implements OnInit {
  personne: Personne;
  isConnected: boolean;
  @ViewChild("avatar") avatar: ElementRef;

  constructor(private myDataBase: UsersDbService, 
    private http: HttpClient,
    public modalSignIn: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  snack(){
    this.snackBar.open("Bienvenue " + this.personne.prenom + '. Nous sommes ravis de vous revoir.', 'Fermer', {
      duration: 3000
    })
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
    this.personne.id               = 0
    this.personne.nom              = ''
    this.personne.prenom           = ''
    this.personne.password         = ''
    this.personne.dateNaissance    = null
    this.personne.adresse          = ''
    this.personne.mobile           = ''
    this.personne.mail             = ''
    this.personne.actif            = ''
    this.personne.id_Categorie     = 0
    this.personne.token            = ''
    this.personne.libelleCategorie = ''
    this.personne.avatar           = ''
    localStorage.setItem('authorization', '')
    this.isConnected=false;
  }

  Connexion(){
    this.myDataBase.signIn(this.personne).subscribe(retour => this.connected(retour), err=>{console.log(err)});
  }

  getProfile(){
    this.myDataBase.getProfile(this.personne).subscribe(retour=>{
      this.parsePersonne(retour);
      this.personne.prenom = retour['prenom'];
      this.snack();
    })    
  }

  parsePersonne(data){
    this.personne.id               = data['idPersonne']
    this.personne.nom              = data['nom']
    this.personne.prenom           = data['prenom']
    this.personne.password         = data['password']
    this.personne.dateNaissance    = data['dateNaissance']
    this.personne.adresse          = data['adresse']
    this.personne.mobile           = data['mobile']
    this.personne.mail             = data['mail']
    this.personne.actif            = data['actif']
    this.personne.id_Categorie     = data['id_Categorie']
    this.personne.token            = data['token']
    this.personne.libelleCategorie = data['libelleCategorie']  
    this.personne.avatar           = data['avatar']
  }

  getAvatar(){
    this.myDataBase.getAvatar().subscribe(
      blob=>{
        this.avatar.nativeElement.src = window.URL.createObjectURL(blob)
      }
    );    
  }

  profileAcquis(data){
    this.parsePersonne(data);
    this.getAvatar();
  }

  private connected(data){
    this.parsePersonne(data);
    localStorage.setItem('authorization', this.personne.token)
    this.isConnected=true;
    this.getAvatar();
  }

  test(){
    this.modalSignIn.open(modalSignInComponent, {
      data: {
        prenom: this.personne.prenom
    }})
  }
}

@Component({
  selector: 'modalSignIn',
  templateUrl: 'modalSignIn.html',
})
export class modalSignInComponent{

  prenom: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.prenom=data['prenom'];
   }
}