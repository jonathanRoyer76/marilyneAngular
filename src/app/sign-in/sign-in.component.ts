import { Component, OnInit } from '@angular/core';
import { Personne } from '../personne'
import { UsersDbService } from '../users-db.service'

@Component({
  selector   : 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls  : ['./sign-in.component.css'],
  providers: [UsersDbService]
})
export class SignInComponent implements OnInit {
  personne = new Personne();

  constructor(private myDataBase: UsersDbService) { }

  ngOnInit() {
    this.personne = new Personne();
  }

  Connexion(){
    //Appeler la méthode signIn du service myDataBase
    this.myDataBase.signIn(this.personne).subscribe()
  }

}
