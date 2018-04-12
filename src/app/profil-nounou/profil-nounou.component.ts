import { Component, OnInit } from '@angular/core';
import { ProfilNounou } from '../profilNounou';
import { Personne } from '../personne'
import { Categorie } from '../categorie'
// import { UsersDbService } from '../users-db.service'
import { ProfileNounouService } from '../profile-nounou.service'
import { RouterModule, Routes, Router } from '@angular/router'
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms'
import { UsersDbService } from '../users-db.service';
import { MatSnackBar } from '@angular/material'

@Component({
  selector: 'app-profil-nounou',
  templateUrl: './profil-nounou.component.html',
  styleUrls: ['./profil-nounou.component.css']
})
export class ProfilNounouComponent implements OnInit {
  myProfile          : ProfilNounou
  myFormGroup        : FormGroup
  myListePersonne    : Personne[]
  myPers             : Personne
  mylisteCategorie   : Categorie[]
  myIdCategorieNounou: number

  //Controleurs
  controlTauxHoraire       = new FormControl('',[Validators.minLength(0)])
  controlMontantRepas      = new FormControl('',[Validators.minLength(0)])
  controlMontantIndemnites = new FormControl('',[Validators.minLength(0)])
  controlMontantGouter     = new FormControl('',[Validators.minLength(0)])
  controlBaremeKm          = new FormControl('',[Validators.minLength(0)])

  constructor(
    private myUsersDataBase        : UsersDbService,
    private myProfileNounouDataBase: ProfileNounouService,
    private myRouter               : Router,
    private mySnackBar             : MatSnackBar,
  ) { }

  ngOnInit() {
    this.myProfile        = new ProfilNounou()
    this.myPers           = new Personne()
    this.myFormGroup      = new FormGroup({
      tauxHoraire      : this.controlTauxHoraire,
      montantRepas     : this.controlMontantRepas,
      montantIndemnites: this.controlMontantIndemnites,
      montantGouter    : this.controlMontantGouter,
      baremKm          : this.controlBaremeKm,
    })
    this.myProfileNounouDataBase.getProfileNounou().subscribe(data=>{
      this.myProfile = data
      if (this.myProfile.id_Personne ==0 || this.myProfile == undefined){
        this.myIdCategorieNounou = -1   //Initialisation
        this.myUsersDataBase.getProfiles().subscribe(data=>{
          this.myListePersonne = data
          this.myProfileNounouDataBase.getIdCategorieNounou().subscribe(
            data=>{
              this.myIdCategorieNounou = data
              if (this.myIdCategorieNounou != -1){
                //parcourd de la liste des utilisateurs
                for (let temp of this.myListePersonne){
                  if (temp.id_Categorie == this.myIdCategorieNounou){
                    //Attribution de l'id de nounou
                    this.myProfile.id_Personne =temp.idPersonne
                    break
                  }
                }
              }
            }
          )      
        })    
      }
    })    
  }

  //Lors du clic sur le bouton annuler dans l'IHM
  annuler(){
    this.myRouter.navigate([''])
  }

  //Ajoute le profil dans la BDD
  saveProfileNounou(){
    this.myProfileNounouDataBase.saveProfileNounou(this.myProfile).subscribe(data=>{
      this.myProfile = data
      this.mySnackBar.open('Modifications enregistrées', 'Fermer', {
        duration : 2500
      })
    })
  }
}
