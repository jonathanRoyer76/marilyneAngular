import { Injectable } from '@angular/core';
import { Personne } from './personne'
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersDbService {
  //Les constantes
  public static URL_SIGN_IN = 'localhost:8080/users/signIn'
  public static URL_SIGN_UP = 'localhost:8080/users/signUp'
  public static URL_PROFILE = 'localhost:8080/users/me'

  constructor(private http: HttpClient) { }

  signIn(personne: Personne): Observable<Personne>{
    const option = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };
    return this.http.post<Personne>(UsersDbService.URL_SIGN_IN, {'mail': personne.mail, 'password': personne.password}, option)
  }
}
