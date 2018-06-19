import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { UsersDbService } from '../services/users-db.service'
import { Categorie } from '../classes/categorie'

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
        data=>{
          console.log(data)
          this.tableSource = this.myDataBase.determineCategories(data)          
          this.formatDates()
          this.dataSourceProfiles = new MatTableDataSource(this.tableSource)
        },err=>{console.error(err.error)}
      )
  }  

  formatDates(){    
    for (var i=0; i<this.tableSource.length; i++){
      let myDate = new Date(this.tableSource[i].dateNaissance)
      this.tableSource[i].dateNaissance = myDate.toLocaleString().split(" ")[0]
    }
  }
}
