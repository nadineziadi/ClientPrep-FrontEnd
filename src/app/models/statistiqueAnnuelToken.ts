export class StatistiqueAnnuelToken {
  id: number;
  annee: number;
  nb: number;
  typetoken:string;

  constructor(id:number, annee:number,nb:number, typetoken:string)
  {
    this.nb= nb;
    this.id=id;
    this.annee=annee;
    this.typetoken=typetoken;
  }
  
}
