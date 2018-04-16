export class Contrat {
    idContrat           : number
    tauxHoraireBrut     : number
    tauxHoraireNet      : number
    nbSemainesGardeAn   : number
    nbHeuresGardeSemaine: number
    nbJoursGardeSemaine : number
    montantRepas        : number
    montantIndemnites   : number
    montantGouter       : number
    baremeKm            : number
    salaireBaseBrut     : number
    salaireBaseNet      : number
    congesPayesBaseBrut : number
    congesPayesBaseNet  : number
    salaireTotalBaseBrut: number
    salaireTotalBaseNet : number
    dateDebut           : Date
    dateFin             : Date
    moyNbJoursGardeMois : number
    moyNbHeuresGardeMois: number
}