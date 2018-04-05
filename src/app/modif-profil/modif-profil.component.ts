import { Component, OnInit, Inject } from '@angular/core';
import { Personne } from '../personne'
import { Categorie } from '../categorie'
import { MAT_DIALOG_DATA, MAT_SNACK_BAR_DATA, MatSnackBar, MatDialogRef } from '@angular/material'
import { UsersDbService } from '../users-db.service'
import { ErrorsHandlerService } from '../errorsHandlers/errors-handler.service';
import { FormGroupDirective, NgForm } from '@angular/forms'
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-modif-profil',
  templateUrl: './modif-profil.component.html'
})
export class ModifProfilComponent{
  public personne  : Personne;
  public categorie : Categorie;
  public categories: Categorie[];
  
  private fichier  : File;  
  myFormGroup      : FormGroup

  //Contrôleurs d'erreurs
  controlNom             = new FormControl('', [Validators.required])  
  controlPrenom          = new FormControl('', [Validators.required])
  controlPassword        = new FormControl('', [Validators.required, Validators.minLength(1)])
  controlConfirmPassword = new FormControl('', [Validators.required, Validators.minLength(1)])
  controlMail            = new FormControl('', [Validators.required, Validators.minLength(1), Validators.email])
  controlDateNaissance   = new FormControl('', [Validators.minLength(0)])
  controlMobile          = new FormControl('', [Validators.pattern(/#^0[1-68]([-. ]?[0-9]{2}){4}$#/)])

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private myDataBase: UsersDbService,
    private httpErrorHandler: ErrorsHandlerService,
    private snackBarModif: MatSnackBar,
    public refModal : MatDialogRef<ModifProfilComponent>
  ){
    this.personne  = new Personne();
    this.categorie = new Categorie();
    this.personne.idPersonne       = data['id']
    this.personne.nom              = data['nom']
    this.personne.prenom           = data['prenom']
    this.personne.password         = data['password']
    this.personne.dateNaissance    = data['dateNaissance']
    this.personne.adresse          = data['adresse']
    this.personne.telPortable      = data['mobile']
    this.personne.mail             = data['mail']
    this.personne.actif            = data['actif']
    this.personne.id_Categorie     = data['id_Categorie']
    this.personne.token            = data['token']
    this.personne.libelleCategorie = data['libelleCategorie']
   }

   ngOnInit() {
    this.myFormGroup = new FormGroup({
      nom            : this.controlNom,
      prenom         : this.controlPrenom,
      password       : this.controlPassword,
      confirmPassword: this.controlConfirmPassword,
      mail           : this.controlMail,
      mobile         : this.controlMobile,
      dateNaissance  : this.controlDateNaissance,
      adresse        : new FormControl('',[Validators.minLength(0)]),
      id_Categorie   : new FormControl('',[Validators.minLength(0)]),
      actif          : new FormControl('',[Validators.minLength(0)]),
    })
    this.listeCategories();
  }

   onNoClick(): void {
    this.refModal.close();
  }

  isAdmin(){
    if (this.personne.libelleCategorie == 'Administrateur') return true
    else return false
  }

  listeCategories(){
    this.myDataBase.getCategories().subscribe(data=>
      {this.categories = data}
      , err=>(this.httpErrorHandler.modalHttpError(err)))
  }

  // test(){
    // this.myDataBase.getCategories().subscribe(data=>{
    //   this.categories = data
    //   console.log(this.categories[0].intitule)
    // }, err=>console.error(err.error))
  // }

  validation(){
    this.myDataBase.updateProfile(this.personne).subscribe(data=>(this.envoiFichier(data)), err=>this.httpErrorHandler.modalHttpError(err));        
  }
  
  envoiFichier(data){
    this.personne.idPersonne    = data['idPersonne']
    this.personne.nom           = data['nom']
    this.personne.prenom        = data['prenom']
    this.personne.password      = data['password']
    this.personne.dateNaissance = data['dateNaissance']
    this.personne.adresse       = data['adresse']
    this.personne.telPortable   = data['mobile']
    this.personne.mail          = data['mail']
    this.personne.actif         = data['actif']
    this.personne.id_Categorie  = data['id_Categorie']
    this.snackBarModif.open('Modifications enregistrées', 'Fermer', {
      duration: 2500
    });

    if (this.fichier!=undefined && this.personne.idPersonne!=undefined){
      this.myDataBase.envoiAvatar(this.fichier, this.personne.idPersonne.toString()).subscribe(data=>{}, err=>this.httpErrorHandler.modalHttpError(err));
    }else{
      this.refModal.close(this.personne)
    }
  }

  selectionFichier(event){
    this.fichier = event.target.files[0];    
  }
}