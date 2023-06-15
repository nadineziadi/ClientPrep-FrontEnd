import { Typetoken } from './typetoken';
import { Compteur } from './compteur';
import { User } from './user';
export class Token {
  id: number;
  compteur: Compteur;
  typetoken: Typetoken;
  numerotoken;string;

  constructor()
  {
    this.compteur = new Compteur();
    this.typetoken = new Typetoken(); 
  }
}