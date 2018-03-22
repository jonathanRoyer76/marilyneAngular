import { Component, OnInit } from '@angular/core';
import { Personne } from '../personne'
import { UsersDbService } from '../users-db.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable} from 'rxjs/Observable'

@Component({
  selector   : 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls  : ['./sign-in.component.css'],
  providers: [UsersDbService]
})
export class SignInComponent implements OnInit {
  personne: Personne;
  isConnected: boolean;

  constructor(private myDataBase: UsersDbService, private http: HttpClient) { }

  ngOnInit() {
    this.personne = new Personne();
    let token = localStorage.getItem('authorization')
    if (token!=undefined && token!=''){
      this.isConnected = true;
      this.personne.token = token;
      this.getProfile();
    }else{
      this.isConnected=false;
    }    
  }

  Deconnexion(){
    this.personne = undefined
    localStorage.setItem('authorization', '')
    this.isConnected=false;
  }

  Connexion(){
    this.myDataBase.signIn(this.personne).subscribe(retour => this.connected(retour), err=>{console.log(err)});
  }

  getProfile(){
    this.myDataBase.getProfile(this.personne).subscribe(retour => this.personne = retour)    
  }

  private connected(data){
    this.personne.id = data['idPersonne']
    this.personne.nom = data['nom']
    this.personne.prenom = data['prenom']
    this.personne.password = data['password']
    this.personne.dateNaissance = data['dateNaissance']
    this.personne.adresse = data['adresse']
    this.personne.mobile = data['mobile']
    this.personne.mail = data['mail']
    this.personne.actif = 'true'
    this.personne.id_Categorie = 4
    this.personne.token = data['token']
    
    localStorage.setItem('authorization', this.personne.token)
    this.isConnected=true;
  }

}
