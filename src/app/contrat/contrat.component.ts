import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Contrat } from '../classes/contrat'
import { Personne } from '../classes/personne'
import { Planning } from '../classes/planning'
import { ProfilNounou } from '../classes/profilNounou'
import { DonneesContrat } from '../classes/donneesContrat'

import { MatDatepicker,  DateAdapter } from '@angular/material'

import { ContratService } from '../services/contrat.service'
import { ProfileNounouService } from '../services/profile-nounou.service'

import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.css'],
})
export class ContratComponent implements OnInit {
  donneesContrat           : DonneesContrat
  // myContrat                : Contrat
  myProfileNounou          : ProfilNounou
  // myPlanning               : Planning
  // myEnfant                 : Personne
  // myMere                   : Personne
  // myPere                   : Personne
  // myDocteur                : Personne
  // myTuteur                 : Personne
  myFormGroupContrat       : FormGroup
  myFormGroupRenseignements: FormGroup
  myFormGroupPlanning      : FormGroup

  //Contrôleurs d'erreurs de saisie
  controlEnfantNom    = new FormControl('',[Validators.required])
  controlEnfantPrenom = new FormControl('',[Validators.required])
  controlMereNom      = new FormControl('',[Validators.required])
  controlMerePrenom   = new FormControl('',[Validators.required])
  controlPereNom      = new FormControl('',[Validators.required])
  controlPerePrenom   = new FormControl('',[Validators.required])

  // Date minimale sélectionnable dans les datePickers
  minDateDebut = new Date()

  constructor(
    private myContratService      : ContratService,
    private myProfileNounouService: ProfileNounouService,
    private adapter               : DateAdapter<any>
  ) {} 

  ngOnInit() {
    this.adapter.setLocale('fr-FR')
    this.donneesContrat                      = new DonneesContrat()
    this.donneesContrat.contrat              = new Contrat();
    this.myProfileNounou                     = new ProfilNounou()
    this.donneesContrat.enfant               = new Personne()
    this.donneesContrat.mere                 = new Personne()
    this.donneesContrat.pere                 = new Personne()
    this.donneesContrat.docteur              = new Personne()
    this.donneesContrat.tuteur               = new Personne()   
    this.donneesContrat.planning             = new Planning()
    this.donneesContrat.contrat.dateDebut    = new Date()
    this.donneesContrat.contrat.dateFin      = new Date()
    this.donneesContrat.enfant.dateNaissance = new Date()
    this.myProfileNounouService.getProfileNounou().subscribe(data=>{
      this.myProfileNounou                          = data
      this.donneesContrat.contrat.tauxHoraireNet    = this.myProfileNounou.tauxHoraire
      this.calculTauxHoraireBrut(this.donneesContrat.contrat.tauxHoraireNet)
      this.donneesContrat.contrat.montantRepas      = this.myProfileNounou.montantRepas
      this.donneesContrat.contrat.montantIndemnites = this.myProfileNounou.montantIndemnites
      this.donneesContrat.contrat.montantGouter     = this.myProfileNounou.montantGouters
      this.donneesContrat.contrat.baremeKm          = this.myProfileNounou.baremeKm
    })
    this.myFormGroupContrat        = new FormGroup({
      moyHeuresParSemaine          : new FormControl(),
      moyHeuresParMois             : new FormControl(),
      moySemainesParAn             : new FormControl(),
      nbJoursParSemaine            : new FormControl(),
      dateDebut                    : new FormControl(),
      dateFin                      : new FormControl(),
      moyJoursParMois              : new FormControl(),
      tauxHoraireBrut              : new FormControl({disabled : true},[Validators.minLength(0)]),
      tauxHoraireNet               : new FormControl(),
      salaireBaseBrut              : new FormControl(),
      salaireBaseNet               : new FormControl(),
      congesPayesBaseBrut          : new FormControl(),
      congesPayesBaseNet           : new FormControl(),
      salaireTotalBaseBrut         : new FormControl(),
      salaireTotalBaseNet          : new FormControl(),
      montantRepas                 : new FormControl(),
      montantIndemnites            : new FormControl(),
      montantGouter                : new FormControl(),
      baremeKm                     : new FormControl(),
    })
    this.myFormGroupRenseignements = new FormGroup({
      enfantNom                    : this.controlEnfantNom,
      enfantPrenom                 : this.controlEnfantPrenom,
      enfantDateNaissance          : new FormControl(),
      mereNom                      : this.controlMereNom,
      merePrenom                   : this.controlMerePrenom,
      mereMail                     : new FormControl(),
      mereAdresse                  : new FormControl(),
      mereTelPortable              : new FormControl(),
      pereNom                      : this.controlPereNom,
      perePrenom                   : this.controlPerePrenom,
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
    this.myFormGroupPlanning = new FormGroup({
      lundiArrivee : new FormControl(),
      lundiDepart : new FormControl(),
      mardiArrivee : new FormControl(),
      mardiDepart : new FormControl(),
      mercrediArrivee : new FormControl(),
      mercrediDepart : new FormControl(),
      jeudiArrivee : new FormControl(),
      jeudiDepart : new FormControl(),
      vendrediArrivee : new FormControl(),
      vendrediDepart : new FormControl(),
      samediArrivee : new FormControl(),
      samediDepart : new FormControl(),
      dimancheArrivee : new FormControl(),
      dimancheDepart : new FormControl(),
    })
  }  

  // Calcule et met à jour le taux oraire brut lors de la saisie du net
  calculTauxHoraireBrut(value){
    this.donneesContrat.contrat.tauxHoraireNet = value
    this.donneesContrat.contrat.tauxHoraireBrut = this.donneesContrat.contrat.tauxHoraireNet*100/77
    this.calculSalaireBaseBrut()
    this.calculCPBaseBrut()
    this.calculCPBaseNet()
  }
  // Calcule la moyenne du nombre d'heures de garde par mois
  calculMoyenneHeuresParMois(){
    this.donneesContrat.contrat.moyNbHeuresGardeMois = (this.donneesContrat.contrat.nbHeuresGardeSemaine * this.donneesContrat.contrat.nbSemainesGardeAn) / 12
  }
  // Calcule la moyenne de jours par mois
  calculMoyenneJoursParMois(){
    this.donneesContrat.contrat.moyNbJoursGardeMois = (this.donneesContrat.contrat.nbSemainesGardeAn*this.donneesContrat.contrat.nbJoursGardeSemaine) / 12
  }
  // Calcule le salaire net de base
  calculSalaireBaseNet(){
    this.donneesContrat.contrat.salaireBaseNet = (this.donneesContrat.contrat.tauxHoraireNet*this.donneesContrat.contrat.nbSemainesGardeAn*this.donneesContrat.contrat.nbHeuresGardeSemaine)/12    
    this.calculSalaireBaseBrut()
    this.calculCPBaseBrut()
    this.calculCPBaseNet()
    this.calculSalaireTotalBaseNet()
  }
  // Calcule le salaire brut de base
  calculSalaireBaseBrut(){
    this.donneesContrat.contrat.salaireBaseBrut = (this.donneesContrat.contrat.tauxHoraireBrut*this.donneesContrat.contrat.nbSemainesGardeAn*this.donneesContrat.contrat.nbHeuresGardeSemaine)/12  
    this.calculCPBaseBrut()
    this.calculCPBaseNet()
    this.calculSalaireTotalBaseBrut()
  }
  // Calcule la base de rémunération des congés payés brut
  calculCPBaseBrut(){
    this.donneesContrat.contrat.congesPayesBaseBrut = (5*this.donneesContrat.contrat.tauxHoraireBrut*this.donneesContrat.contrat.nbHeuresGardeSemaine) / 12    
    this.calculSalaireTotalBaseBrut()
  }
  // Calcule la base de rémunération des congés payés net
  calculCPBaseNet(){
    this.donneesContrat.contrat.congesPayesBaseNet = (5*this.donneesContrat.contrat.tauxHoraireNet*this.donneesContrat.contrat.nbHeuresGardeSemaine) / 12    
    this.calculSalaireTotalBaseNet()
  }
  // Calcule le total brut du salaire
  calculSalaireTotalBaseBrut(){
    this.donneesContrat.contrat.salaireTotalBaseBrut = this.donneesContrat.contrat.salaireBaseBrut + this.donneesContrat.contrat.congesPayesBaseBrut
  }
  // Calcule le total net du salaire
  calculSalaireTotalBaseNet(){
    this.donneesContrat.contrat.salaireTotalBaseNet = this.donneesContrat.contrat.salaireBaseNet + this.donneesContrat.contrat.congesPayesBaseNet
  }

  test(){
    console.log(this.donneesContrat)
  }

  //Envoi le contrat dans la BDD
  envoiContrat(){
    this.donneesContrat.contrat = this.donneesContrat.contrat
    this.myContratService.addContract(this.donneesContrat).subscribe(
      // data=>{console.log(data)}
    )
  }
  //Respecter l'ordre d'insertion dans la BDD
  // 1 - le contrat
  // 2 - les personnes (mere, pere, enfant, tuteur, medecin)
  // 3 - le planning (grace à l'id contrat)
  // 4 - avec les id (contrats, pere, mere, enfant, tuteur et medecin), insérer 
  // dans la table de jointure contrat_personne
}