import { Component, OnInit, Inject } from '@angular/core';
import { Personne } from '../personne'
import { Categorie } from '../categorie'
import { MAT_DIALOG_DATA, MAT_SNACK_BAR_DATA, MatSnackBar, MatDialogRef } from '@angular/material'
import { UsersDbService } from '../users-db.service'
import { ErrorsHandlerService } from '../errorsHandlers/errors-handler.service';
import { FormGroupDirective, NgForm } from '@angular/forms'
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms'
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-modif-profil',
  templateUrl: './modif-profil.component.html'
})
export class ModifProfilComponent{
  public personne      : Personne;
  public selectedUser  : Personne
  public listePersonne : Personne[]
  public categorie     : Categorie;
  public categories    : Categorie[];
  public isAdminBoo    : boolean
  public modifPersonnne: Personne
  
  private fichier  : File;  
  myFormGroup      : FormGroup

  //Contrôleurs d'erreurs
  controlNom             = new FormControl('', [Validators.required])  
  controlPrenom          = new FormControl('', [Validators.required])
  controlPassword        = new FormControl()
  controlConfirmPassword = new FormControl()
  controlMail            = new FormControl('', [Validators.required, Validators.minLength(1), Validators.email])
  controlDateNaissance   = new FormControl()
  controltelPortable     = new FormControl('', [Validators.pattern(/#^0[1-68]([-. ]?[0-9]{2}){4}$#/)])

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private myDataBase                  : UsersDbService,
    private httpErrorHandler            : ErrorsHandlerService,
    private snackBarModif               : MatSnackBar,
    public refModal                     : MatDialogRef<ModifProfilComponent>
  ){
    this.personne                  = new Personne();
    this.categorie                 = new Categorie();
    this.modifPersonnne            = new Personne();
    this.personne.idPersonne       = data['idPersonne']
    this.personne.nom              = data['nom']
    this.personne.prenom           = data['prenom']
    this.personne.password         = data['password']
    this.personne.dateNaissance    = data['dateNaissance']
    this.personne.adresse          = data['adresse']
    this.personne.telPortable      = data['telPortable']
    this.personne.mail             = data['mail']
    this.personne.actif            = data['actif']
    this.personne.id_Categorie     = data['id_Categorie']
    this.personne.token            = data['token']
    this.personne.libelleCategorie = data['libelleCategorie']
    this.modifPersonnne            = this.personne
   }

   ngOnInit() {
    this.myFormGroup = new FormGroup({
      selectedId     : new FormControl(),
      nom            : this.controlNom,
      prenom         : this.controlPrenom,
      password       : this.controlPassword,
      confirmPassword: this.controlConfirmPassword,
      mail           : this.controlMail,
      telPortable    : this.controltelPortable,
      dateNaissance  : this.controlDateNaissance,
      adresse        : new FormControl('',[Validators.minLength(0)]),
      id_Categorie   : new FormControl('',[Validators.minLength(0)]),
      actif          : new FormControl('',[Validators.minLength(0)]),
    })
    this.listeCategories();    
    this.myDataBase.getProfiles().subscribe(data=>{this.listePersonne = data})
  }

  //  onNoClick(): void {
  //   this.refModal.close();
  // }

  //On change le profil utilisateur à modifier
  onSelect(id){
    this.myDataBase.getProfileWithId(id).subscribe(data=>{
      this.modifPersonnne = data
    })
  }

  //Détermine si l'utilisateur a le profil administrateur ou non
  isAdmin(){
    if (this.personne.libelleCategorie == 'Administrateur') this.isAdminBoo = true
    else this.isAdminBoo = false
  }

  listeCategories(){
    this.myDataBase.getCategories().subscribe(data=>
      {
        this.categories = data
        for (let cat of this.categories){
          if (cat.idCategorie == this.personne.id_Categorie){
            this.personne.libelleCategorie = cat.intitule
            this.isAdmin()
            break
          }
        }
      }
      , err=>(this.httpErrorHandler.modalHttpError(err)))
  }

  // test(){
    // this.myDataBase.getCategories().subscribe(data=>{
    //   this.categories = data
    //   console.log(this.categories[0].intitule)
    // }, err=>console.error(err.error))
  // }

  //Appeler lors du clic sur le bouton de fermeture
  fermeture(){
    this.refModal.close(this.modifPersonnne)
  }

  //Appelé lors du clic sur le bouton Valider
  validation(){
    this.myDataBase.updateProfile(this.modifPersonnne).subscribe(data=>{
      this.modifPersonnne = data
      this.snackBarModif.open('Modifications enregistrées', 'Fermer', {
        duration: 2500
      });
      this.refModal.close(this.modifPersonnne)
    }, err=>this.httpErrorHandler.modalHttpError(err));        
  }
  
  envoiFichier(){
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