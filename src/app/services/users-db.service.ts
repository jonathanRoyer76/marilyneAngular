import { Injectable } from '@angular/core';
import { Personne } from '../classes/personne'
import { Categorie } from '../classes/categorie'
import { ProfilNounou } from '../classes/profilNounou'
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse, HttpHandler } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersDbService {
  //Variables locales
  private listeCategories: Categorie[]

  //Les constantes  
  private static HEADER = { headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})}
  
  //URLs pour les utilisateurs
  public static URL_SIGN_IN = 'http://localhost:8080/api/users/signIn'
  public static URL_SIGN_UP = 'http://localhost:8080/api/users/signUp'
  public static URL_PROFILE = 'http://localhost:8080/api/users/me'
  public static URL_PROFILE_NOUNOU = 'http://localhost:8080/api/users/nounou'
  public static URL_PROFILES = 'http://localhost:8080/api/users/profiles'
  public static URL_PROFILE_ID = 'http://localhost:8080/api/users/profileWithId'
  public static URL_AVATAR  = 'http://localhost:8080/api/users/avatar'
  public static URL_CATEGORIES  = 'http://localhost:8080/api/users/categories'

  constructor(private http: HttpClient) {
   }  

  //Détermine les catégories pour la liste des utilisateurs
  determineCategories(listeProfiles: Personne[]): Personne[]{  
    let listeCategories 
    this.getCategories().subscribe(data=>{
      listeCategories = data
      for ( let i=0; i<listeProfiles.length; i++){
        for (let tempCategorie of listeCategories){
          if (listeProfiles[i].id_Categorie == tempCategorie.idCategorie)
          listeProfiles[i].libelleCategorie = tempCategorie.intitule
        }
      }
    })        
    return listeProfiles
  }

  //appelle l'API retrouvant la liste des catégories
  getCategories() : Observable<Categorie[]>{
    return this.http.get<Categorie[]>(UsersDbService.URL_CATEGORIES)
  }

  //appelle l'API de connexion pour le loggin
  signIn(personne: Personne):Observable<Personne>{  
    console.log(UsersDbService.URL_SIGN_IN)  
    let body = 'mail='+personne.mail+'&password='+personne.password

    return this.http.post<Personne>(UsersDbService.URL_SIGN_IN, body, 
      UsersDbService.HEADER)
  }

  //appelle l'API retrouvant la liste des profils utilisateurs
  getProfiles(): Observable<Personne[]>{
    return this.http.get<Personne[]>(UsersDbService.URL_PROFILES)
  }

  //Récupère le profil nounou
  getProfileNounou(): Observable<Personne>{
    return this.http.get<Personne>(UsersDbService.URL_PROFILE_NOUNOU)
  }

  //appelle l'API pour récupérer le profil de l'utilisateur connecté
  getProfile(pers: Personne): Observable<Personne>{
    return this.http.get<Personne>(UsersDbService.URL_PROFILE) 
  }   

  getProfileWithId(id: number): Observable<Personne>{
    let paramId = new HttpParams().set('idPersonne', id.toString())
    let myHeader = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
    return this.http.get<Personne>(UsersDbService.URL_PROFILE_ID, {headers: myHeader, params: paramId})
  }

  //appelle l'API d'envoi du fichier avatar au serveur
  envoiAvatar(fichier: File, id: string): Observable<JSON>{
    let head = new HttpHeaders({
      'enctype': 'multipart/form-data',
      'Accept': 'application/json'
    })
    let mesParams =  new HttpParams().set('idPersonne', id)    
    let formData: FormData = new FormData();
    formData.append('avatar', fichier, fichier.name);     

    return this.http.post<JSON>(UsersDbService.URL_AVATAR, formData, {headers: head, params: mesParams})
  }

  //appelle l'API pour obtenir le fichier contenant l'avatar
  getAvatar(): Observable<Blob>{
    let head = new HttpHeaders({
      'Content-Type':'image/jpeg',
    })
    
    return this.http.get(UsersDbService.URL_AVATAR, {responseType: 'blob'})
  }

  //Crée le body pour la BDD en fonction de l'objet Personne passé en paramètre
  private createBodyFromPersonObject(personne: Personne, confirmPassword?: string): string{
    let retour = 'nom='+personne.nom+
    '&prenom='+personne.prenom+
    '&password='+personne.password+
    '&confirmPassword='+personne.confirmPassword+
    '&dateNaissance='+personne.dateNaissance+
    '&adresse='+personne.adresse+
    '&telPortable='+personne.telPortable+
    '&mail='+personne.mail;
    if (personne.actif!='' || personne.actif!=undefined || personne.actif!=null)
      retour = retour + '&actif=' + personne.actif
    else retour = retour + '&actif=true'
    if (personne.id_Categorie!=0 || personne.id_Categorie!=undefined || personne.id_Categorie!=null)
      retour = retour + '&id_Categorie=' + personne.id_Categorie
    else retour = retour + '&id_Categorie=3'
    return retour;
  }

  //appelle l'API d'enregistrement d'un nouvel utilisateur
  signUp(personne: Personne): Observable<Personne>{
    let body = this.createBodyFromPersonObject(personne);

    return this.http.post<Personne>(UsersDbService.URL_SIGN_UP, body, UsersDbService.HEADER)
  }

  //MAJ du profil utilisateur dans la BDD
  updateProfile(personne: Personne): Observable<Personne>{
    let body = this.createBodyFromPersonObject(personne);
    
    return this.http.put<Personne>(UsersDbService.URL_PROFILE, body, UsersDbService.HEADER);
  }
}