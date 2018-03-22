import { Injectable } from '@angular/core';
import { Personne } from './personne'
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http'

import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersDbService {
  //Les constantes  
  private static HEADER = { headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})}
  
  public static URL_SIGN_IN = 'http://192.168.1.69:8080/api/users/signIn'
  public static URL_SIGN_UP = 'http://192.168.1.69:8080/api/users/signUp'
  public static URL_PROFILE = 'http://192.168.1.69:8080/api/users/me'
  public static URL_AVATAR  = 'http://192.168.1.69:8080/api/users/avatar'

  constructor(private http: HttpClient) { }

  signIn(personne: Personne):Observable<Personne>{    
    let body = 'mail='+personne.mail+'&password='+personne.password

    return this.http.post<Personne>(UsersDbService.URL_SIGN_IN, body, 
      UsersDbService.HEADER)
  }

  getProfile(pers: Personne): Observable<Personne>{
    return this.http.get<Personne>(UsersDbService.URL_PROFILE) 
  }   

  envoiAvatar(fichier: File, id: string): Observable<JSON>{
    let head = new HttpHeaders({
      'enctype': 'multipart/form-data',
      'Accept': 'application/json'
    })
    let mesParams =  new HttpParams().set('idPersonne', id)    
    console.log(head)
    let formData: FormData = new FormData();
    formData.append('avatar', fichier, fichier.name);     

    return this.http.post<JSON>(UsersDbService.URL_AVATAR, formData, {headers: head, params: mesParams})
  }

  signUp(personne: Personne, confirmPassword: string): Observable<JSON>{
    let body;
      body = 'nom='+personne.nom+
      '&prenom='+personne.prenom+
      '&password='+personne.password+
      '&confirmPassword='+confirmPassword+
      '&dateNaissance='+personne.dateNaissance+
      '&adresse='+personne.adresse+
      '&mobile='+personne.mobile+
      '&mail='+personne.mail+
      '&actif=true&idCategorie=3'

    return this.http.post<JSON>(UsersDbService.URL_SIGN_UP, body, UsersDbService.HEADER)
  }
}