import { Typetoken } from './typetoken';
import { User } from './user';

export class Ticket {
  id: number;
  typetoken: Typetoken;
  //nombre: number;
  user: User;
  numCompteur: string;
  numeroSerie:number;
}