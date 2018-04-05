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
  
  ngOnInit(){
    this.personne = new Personne()
  }
}
