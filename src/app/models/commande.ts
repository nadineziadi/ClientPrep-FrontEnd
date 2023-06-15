import { Token } from './token';
import { Compteur } from './compteur';
import { User } from './user';
import { Panier } from './panier';
export class Commande {
  id: number;
  panier: Panier;
  date: Date;
}