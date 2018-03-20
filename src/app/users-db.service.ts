import { Injectable } from '@angular/core';
import { Personne } from './personne'
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http'

import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersDbService {
  //Les constantes
  public static URL_SIGN_IN = 'http://192.168.1.68:8080/api/users/signIn'
  public static URL_SIGN_UP = 'http://localhost:8080/api/users/signUp'
  public static URL_PROFILE = 'http://localhost:8080/api/users/me'
  private static HEADER = { headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})}
  
  constructor(private http: HttpClient) { }

  signIn(personne: Personne):Observable<Personne>{    
    let body = 'mail='+personne.mail+'&password='+personne.password

    return this.http.post<Personne>(UsersDbService.URL_SIGN_IN, body, 
      UsersDbService.HEADER)
  }   

  // private setToken(result){
  //   this.tempPersonne = result;
  //   console.log('TOKEN RECU: '+this.tempPersonne.token)    
  // }

  getProfile(pers: Personne): Observable<Personne>{    
    let autho = new HttpHeaders().set('Authorization', 'Bearer '+pers.token);    
    let content = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get<Personne>(UsersDbService.URL_PROFILE, 
      {headers: content}
    ) 
  }   
}