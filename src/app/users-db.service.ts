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

  constructor(private http: HttpClient) { }

  signIn(personne: Personne):Observable<Personne>{    
    let body = 'mail='+personne.mail+'&password='+personne.password

    return this.http.post<Personne>(UsersDbService.URL_SIGN_IN, body, 
      UsersDbService.HEADER)
  }

  getProfile(pers: Personne): Observable<Personne>{    
    localStorage.setItem('authorization', 'Bearer '+ pers.token)
    // var headerToken = { headers: new HttpHeaders({'authorization': 'Bearer '+pers.token/*,
    // 'Content-Type': 'application/x-www-form-urlencoded'*/})}

    return this.http.get<Personne>(UsersDbService.URL_PROFILE/*, headerToken/*UsersDbService.HEADER*/
    ) 
  }   
}