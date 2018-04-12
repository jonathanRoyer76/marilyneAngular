import { Injectable } from '@angular/core'
import { Personne } from './personne'
import { Categorie } from './categorie'
import { ProfilNounou } from './profilNounou'
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse, HttpHandler } from '@angular/common/http'
import { map, tap } from 'rxjs/operators'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProfileNounouService {

  private static HEADER = { headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})}

  //URLs pour le profil nounou
  public static URL_UPDATE_DONNEES_NOUNOU  = 'http://192.168.1.69:8080/api/users/UpdateDonneesNounou'
  public static URL_ID_CATEGORIE_NOUNOU  = 'http://192.168.1.69:8080/api/users/getIdCategorieNounou'
  public static URL_GET_PROFILE_NOUNOU  = 'http://192.168.1.69:8080/api/users/getProfileNounou'

  constructor(
    private http : HttpClient) { }

  private createBodyUpdateDonnesNounou(profile : ProfilNounou) : string{
    let body ='tauxHoraire='+profile.tauxHoraire+
    '&montantRepas='+profile.montantRepas+
    '&montantIndemnites='+profile.montantIndemnites+
    '&montantGouters='+profile.montantGouters+
    '&baremeKm='+profile.baremeKm+
    '&id_Personne='+profile.id_Personne
    return body
  }

  //Récupère les données sauvegardées dans la BDD
  getProfileNounou() : Observable<ProfilNounou>{
    return this.http.get<ProfilNounou>(ProfileNounouService.URL_GET_PROFILE_NOUNOU)
  }

  //appelle l'API d'ajout du profil nounou
  saveProfileNounou(profileNounou: ProfilNounou) : Observable<ProfilNounou>{
    let body = this.createBodyUpdateDonnesNounou(profileNounou)
    return this.http.put<ProfilNounou>(ProfileNounouService.URL_UPDATE_DONNEES_NOUNOU, body, ProfileNounouService.HEADER)
  }

  getIdCategorieNounou():Observable<number>{
    return this.http.get<number>(ProfileNounouService.URL_ID_CATEGORIE_NOUNOU)
  }
}