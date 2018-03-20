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

  constructor(private myDataBase: UsersDbService, private http: HttpClient) { }

  ngOnInit() {
    this.personne = new Personne();
  }

  Connexion(){
    this.myDataBase.signIn(this.personne).subscribe(/*data=>{console.log(data)}*/retour => this.personne = retour/*, err=>{console.log(err)}*/);
  }

  getProfile(){
    this.myDataBase.getProfile(this.personne).subscribe(retour => {console.log(retour)} /*this.personne = retour*/)    
  }

}
