import { Injectable } from '@angular/core';
import { Personne } from './personne'
import { Categorie } from './categorie'
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { map, tap } from 'rxjs/operators'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersDbService {
  //Les constantes  
  private static HEADER = { headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})}
  
  public static URL_SIGN_IN = 'http://192.168.1.69:8080/api/users/signIn'
  public static URL_SIGN_UP = 'http://192.168.1.69:8080/api/users/signUp'
  public static URL_PROFILE = 'http://192.168.1.69:8080/api/users/me'
  public static URL_PROFILES = 'http://192.168.1.69:8080/api/users/profiles'
  public static URL_AVATAR  = 'http://192.168.1.69:8080/api/users/avatar'
  public static URL_CATEGORIES  = 'http://192.168.1.69:8080/api/users/categories'

  constructor(private http: HttpClient) { }

  getCategories() : Observable<Categorie[]>{
    return this.http.get<Categorie[]>(UsersDbService.URL_CATEGORIES)
  }

  //appelle l'API de connexion pour le loggin
  signIn(personne: Personne):Observable<Personne>{    
    let body = 'mail='+personne.mail+'&password='+personne.password

    return this.http.post<Personne>(UsersDbService.URL_SIGN_IN, body, 
      UsersDbService.HEADER)
  }

  getProfiles(): Observable<Personne[]>{
    return this.http.get<Personne[]>(UsersDbService.URL_PROFILES)
  }

  //appelle l'API de modification d'un utilisateur
  getProfile(pers: Personne): Observable<Personne>{
    let head = new HttpHeaders({
      'Content-Security-Policy': 'default-src \'self\':'
    })
    return this.http.get<Personne>(UsersDbService.URL_PROFILE/*, {headers: head}*/) 
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
    '&mobile='+personne.telPortable+
    '&mail='+personne.mail;
    if (personne.actif!='' || personne.actif!=undefined || personne.actif!=null)
      retour = retour + '&actif=' + personne.actif
    else retour = retour + '&actif=true'
    if (personne.id_Categorie==0 || personne.id_Categorie!=undefined || personne.id_Categorie!=null)
      retour = retour + '&idCategorie=' + personne.id_Categorie
    else retour = retour + '&idCategorie=3'
    return retour;
  }

  //appelle l'API d'enregistrement d'un nouvel utilisateur
  signUp(personne: Personne): Observable<Personne>{
    let body = this.createBodyFromPersonObject(personne);

    return this.http.post<Personne>(UsersDbService.URL_SIGN_UP, body, UsersDbService.HEADER)
  }

  updateProfile(personne: Personne): Observable<Personne>{
    let body = this.createBodyFromPersonObject(personne);
    
    return this.http.put<Personne>(UsersDbService.URL_PROFILE, body, UsersDbService.HEADER);
  }
}