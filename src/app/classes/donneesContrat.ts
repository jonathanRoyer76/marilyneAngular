import { Contrat } from './contrat'
import { Planning } from './planning'
import { Personne } from './personne';

export class DonneesContrat{
    contrat : Contrat
    enfant  : Personne
    pere    : Personne
    mere    : Personne
    docteur : Personne
    tuteur  : Personne
    planning: Planning
}