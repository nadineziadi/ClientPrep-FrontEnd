import { Gouvernorat } from './gouvernorat';
import { Solde } from './solde';
import { User } from './user';
export class CentreRecharge {
  id: number;
  libelle: string;
  user: User;
  gouvernorat: Gouvernorat;
}