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

  @ViewChild(MatSort) sort : MatSort

  constructor(
    private myDataBase: UsersDbService
  ) { }

  ngOnInit() {  
    this.myDataBase.getProfiles().subscribe(
        data=>{this.tableSource = this.myDataBase.determineCategories(data)
          this.dataSourceProfiles = new MatTableDataSource(this.tableSource)
        },err=>{console.error(err.error)}
      )
  }  
}
