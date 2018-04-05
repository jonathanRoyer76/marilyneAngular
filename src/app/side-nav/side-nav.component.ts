import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Personne } from '../personne'
import { UsersDbService } from '../users-db.service'
import { ModifProfilComponent } from '../modif-profil/modif-profil.component'
import { MatDialog } from '@angular/material'
import { modalSignInComponent } from '../sign-in/sign-in.component'

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  @Input() pers: Personne;
  @Output() persChange = new EventEmitter<Personne>();

  constructor(private myDataBase: UsersDbService,
    private modalModif: MatDialog
  ) { }

  ngOnInit() {
    
  }

  updateProfile(){
    let modalRef = this.modalModif.open(ModifProfilComponent, {
      data: {
        id              : this.pers.idPersonne,
        nom             : this.pers.nom,
        prenom          : this.pers.prenom,
        password        : this.pers.password,
        dateNaissance   : this.pers.dateNaissance,
        adresse         : this.pers.adresse,
        mobile          : this.pers.telPortable,
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
        this.pers = data
      this.persChange.emit(this.pers) 
      }       
    })
  }
}
