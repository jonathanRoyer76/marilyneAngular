import { Injectable } from '@angular/core';
import { Contrat } from '../classes/contrat'
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse, HttpHandler } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { DonneesContrat } from '../classes/donneesContrat'

@Injectable()
export class ContratService {

  constructor(private http : HttpClient) { }

  public static URL_ADD_CONTRACT = 'http://localhost:8080/api/contrats/add'

  //Ajoute un contrat dans la bdd
  addContract(objet : DonneesContrat) : Observable<DonneesContrat>{
    return this.http.post<DonneesContrat>(ContratService.URL_ADD_CONTRACT, objet)
  }
}
