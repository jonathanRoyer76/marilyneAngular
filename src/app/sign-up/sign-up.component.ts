import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Personne } from '../personne'
import { UsersDbService } from '../users-db.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  // styleUrls: ['./sign-up.component.css']
  styleUrls: ['../../css/main.css']
})
export class SignUpComponent implements OnInit {
  personne: Personne;  
  private fichier: File;
  confirmPassword: string;

  constructor(private location: Location, private myDataBase: UsersDbService) { }

  ngOnInit() {
    this.personne = new Personne();
  }

  retour(){
    this.location.back();
  }

  validation(){
    this.myDataBase.signUp(this.personne, this.confirmPassword).subscribe(data=>(this.envoiFichier(data)), err=>this.errorHandler(err));        
    // this.envoiFichier();
  }

  envoiFichier(data){
    // envoiFichier(){
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

    if (this.fichier!=undefined && this.personne.id!=undefined){
      this.myDataBase.envoiAvatar(this.fichier, this.personne.id.toString()).subscribe(data=>{console.log(data)}, err=>{console.log(err)});
    }
  }

  errorHandler(err){
    console.log({err});
  }

  selectionFichier(event){
    this.fichier = event.target.files[0];    
  }
}
