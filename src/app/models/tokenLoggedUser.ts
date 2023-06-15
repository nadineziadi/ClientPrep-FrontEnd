import { User } from "./user";
import { Typetoken } from './typetoken';
import { Compteur } from './compteur';

export class TokenLoggedUser {
  id: number;
  numerotoken: string;
  compteur: Compteur;
  typetoken: Typetoken;
  user:User;
}
