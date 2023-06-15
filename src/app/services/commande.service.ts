import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private baseUrl = 'http://localhost:9093/api/test/commandes';

  constructor(private http: HttpClient) { }

  getCommande(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createCommande(commande: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, commande);
  }

  updateCommande(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteCommande(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getCommandesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

}
