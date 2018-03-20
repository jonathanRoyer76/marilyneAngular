import { Injectable } from '@angular/core';
import { Personne } from './personne'
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http'

import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersDbService {
  //Les constantes
  
  private static HEADER = { headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})}

  public static URL_SIGN_IN = 'http://192.168.1.69:8080/users/signIn'
  public static URL_SIGN_UP = 'http://192.168.1.69:8080/users/signUp'
  public static URL_PROFILE = 'http://192.168.1.69:8080/users/me'

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