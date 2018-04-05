import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { UsersDbService } from '../users-db.service'
import { Categorie } from '../categorie'

@Component({
  selector: 'app-display-data-table',
  templateUrl: './display-data-table.component.html',
  styleUrls: ['./display-data-table.component.css']
})
export class DisplayDataTableComponent implements OnInit {
  colonnesAffichees = ['idPersonne', 'nom', 'prenom', 'dateNaissance', 'adresse',
  'telPortable', 'mail', 'actif', 'libelleCategorie']
  tableSource;        //données reçues du serveur
  dataSourceProfiles  //données utilisées par les controles dans le template
  listeCategories: Categorie[]

  @ViewChild(MatSort) sort : MatSort

  constructor(
    private myDataBase: UsersDbService
  ) { }

  ngOnInit() {   
    this.myDataBase.getCategories().subscribe(data=>this.listeCategories=data)     
    this.myDataBase.getProfiles().subscribe(
      data=>{this.tableSource = data; 
        this.determineCategories()
        this.dataSourceProfiles = new MatTableDataSource(this.tableSource)         
        this.dataSourceProfiles.sort = this.sort}, 
      err=>{console.error(err.error)}
    )
    this.dataSourceProfiles.sort = this.sort;
  }

  determineCategories(){    
    
    for ( let i=0; i<this.tableSource.length; i++){
      for (let tempCategorie of this.listeCategories){
        if (this.tableSource[i].id_Categorie == tempCategorie.idCategorie)
        this.tableSource[i].libelleCategorie = tempCategorie.intitule
      }
    }
  }
}
