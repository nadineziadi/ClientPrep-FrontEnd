import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoldeService {

  private baseUrl = 'http://localhost:9093/api/test/soldes';

  constructor(private http: HttpClient) { }

  getSolde(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  deleteSolde(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }


  getSoldesList(username: string,listSolde:boolean): Observable<any> {
    return this.http.get(`${this.baseUrl}/${username}/${listSolde}`);
  }

  createtransfertSolde( value: any): Observable<any> {
    return this.http.post(this.baseUrl + "/transfertSolde", value);
  }

  alimenterCompte(montant: number): Observable<any> {
    return this.http.post(this.baseUrl + "/alimenterCompte"  , montant );
  } 

  getMonSolde(): Observable<any> {
    return this.http.get(this.baseUrl + "/getCurrentSolde"   );
  }

}
