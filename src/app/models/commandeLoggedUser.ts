import { Token } from './token';
import { Compteur } from './compteur';
import { User } from './user';
import { Panier } from './panier';
export class CommandeLoggedUser {
  id: number;
  panier: Panier;
  date: Date;
  user:User;

}