import { Gouvernorat } from './gouvernorat';

export class MarchandInfos {
    id: number;
    libelle: string;
    telephone: string;
    login: string;
    gouvernorat: Gouvernorat;

    constructor()
    {
        this.gouvernorat = new Gouvernorat()
    }
}