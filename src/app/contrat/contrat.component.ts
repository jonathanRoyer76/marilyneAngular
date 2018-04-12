import { Component, OnInit } from '@angular/core';
import { Contrat } from '../contrat'
import { Personne } from '../personne'
import { Planning } from '../planning'
import { ContratService } from '../contrat.service'
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.css']
})
export class ContratComponent implements OnInit {
  myContrat                : Contrat
  myPlanning               : Planning
  myEnfant                 : Personne
  myMere                   : Personne
  myPere                   : Personne
  myDocteur                : Personne
  myTuteur                 : Personne
  myFormGroupContrat       : FormGroup
  myFormGroupRenseignements: FormGroup

  constructor(private myContratService : ContratService
  ) {}

  ngOnInit() {
    this.myContrat  = new Contrat();
    this.myEnfant   = new Personne()
    this.myMere     = new Personne()
    this.myPere     = new Personne()
    this.myDocteur  = new Personne()
    this.myTuteur   = new Personne()   
    this.myPlanning = new Planning()
    this.myFormGroupContrat        = new FormGroup({
      moyHeuresParSemaine          : new FormControl(),
      moyHeuresParMois             : new FormControl(),
      moySemainesParAn             : new FormControl(),
      dateDebut                    : new FormControl(),
      dateFin                      : new FormControl(),
      moyJoursParMois              : new FormControl(),
      tauxHoraireBrut              : new FormControl(),
      tauxHoraireNet               : new FormControl(),
      salaireBaseBrut              : new FormControl(),
      congesPayesBaseBrut          : new FormControl(),
      salaireTotalBaseBrut         : new FormControl(),
      salaireTotalBaseNet          : new FormControl(),
      montantRepas                 : new FormControl(),
      montantIndemnites            : new FormControl(),
      montantGouter                : new FormControl(),
      baremeKm                     : new FormControl(),
    })
    this.myFormGroupRenseignements = new FormGroup({
      enfantNom                    : new FormControl(),
      enfantPrenom                 : new FormControl(),
      enfantDateNaissance          : new FormControl(),
      mereNom                      : new FormControl(),
      merePrenom                   : new FormControl(),
      mereMail                     : new FormControl(),
      mereAdresse                  : new FormControl(),
      mereTelPortable              : new FormControl(),
      pereNom                      : new FormControl(),
      perePrenom                   : new FormControl(),
      pereMail                     : new FormControl(),
      pereAdresse                  : new FormControl(),
      pereTelPortable              : new FormControl(),
      tuteurNom                    : new FormControl(),
      tuteurPrenom                 : new FormControl(),
      tuteurAdresse                : new FormControl(),
      tuteurTelPortable            : new FormControl(),
      medecinNom                   : new FormControl(),
      medecinPrenom                : new FormControl(),
      medecinAdresse               : new FormControl(),
      medecinTelPortable           : new FormControl(),
    })
  }  
}