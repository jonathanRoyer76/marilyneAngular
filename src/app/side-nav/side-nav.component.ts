import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Personne } from '../personne'
import { ProfilNounou } from '../profilNounou'
import { UsersDbService } from '../users-db.service'
import { ModifProfilComponent } from '../modif-profil/modif-profil.component'
import { ProfilNounouComponent } from '../profil-nounou/profil-nounou.component'
import { MatDialog } from '@angular/material'
import { modalSignInComponent } from '../sign-in/sign-in.component'
import { MatSnackBar } from '@angular/material'

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  @Input() pers: Personne;
  @Output() persChange = new EventEmitter<Personne>();
  private myProfileDonnees : ProfilNounou

  constructor(private myDataBase   : UsersDbService,
    private modalModifProfil       : MatDialog,
    private modalModifDonneesNounou: MatDialog,
    private mySnackBar             : MatSnackBar
  ) { }

  ngOnInit() {
    this.myProfileDonnees = new ProfilNounou();    
  }

  updateProfileNounou(){
    let temp = new Personne()
    this.myDataBase.getProfileNounou().subscribe(
      data => {
        temp  = data
        let modalRef = this.modalModifProfil.open(ModifProfilComponent, {
          data: {
            idPersonne      : temp.idPersonne,
            nom             : temp.nom,
            prenom          : temp.prenom,
            password        : temp.password,
            dateNaissance   : temp.dateNaissance,
            adresse         : temp.adresse,
            telPortable     : temp.telPortable,
            mail            : temp.mail,
            actif           : temp.actif,
            id_Categorie    : temp.id_Categorie,
            token           : temp.token,
            libelleCategorie: temp.libelleCategorie,
            avatar          : temp.avatar,
          }
        })
        modalRef.afterClosed().subscribe(data=>{
          if (data) {
            this.mySnackBar.open('Modifications enregistrées', 'Fermer', {
              duration : 2500
            })
          }       
        })
      }
    )    
  }

  updateProfile(){
    let modalRef = this.modalModifProfil.open(ModifProfilComponent, {
      data: {
        idPersonne      : this.pers.idPersonne,
        nom             : this.pers.nom,
        prenom          : this.pers.prenom,
        password        : this.pers.password,
        dateNaissance   : this.pers.dateNaissance,
        adresse         : this.pers.adresse,
        telPortable          : this.pers.telPortable,
        mail            : this.pers.mail,
        actif           : this.pers.actif,
        id_Categorie    : this.pers.id_Categorie,
        token           : this.pers.token,
        libelleCategorie: this.pers.libelleCategorie,
        avatar          : this.pers.avatar,
      }
    })
    modalRef.afterClosed().subscribe(data=>{
      if (data) {        
        if (data['idPersonne'] == this.pers.idPersonne){
          this.pers = data
          this.persChange.emit(this.pers)
        }
      }       
    })
  }
}
