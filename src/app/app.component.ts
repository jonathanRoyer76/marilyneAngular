import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Personne } from './personne'
import { UsersDbService } from './users-db.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  // styleUrls: ['../css/main.css']
})
export class AppComponent implements OnInit{
  title = 'le site de ma nounou ';
  personne: Personne;
  notAdminBoo : boolean
  
  ngOnInit(){
    this.personne = new Personne()
    this.isAdmin()
  }

  //Détermine si l'utilisateur a le profil administrateur ou non
  isAdmin(){
    if (this.personne.libelleCategorie != 'Administrateur') this.notAdminBoo = true
    else this.notAdminBoo = false
  }
}
