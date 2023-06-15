import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TransfertSoldeService {

  private baseUrl = 'http://localhost:9093/api/test/transfertSoldes';

  constructor(private http: HttpClient) { }

  getTransfertSoldesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }


  updateTransfertSolde(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteTransfertSolde(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }


 

  getTransfertSoldefromSerial(serial: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${serial}`);
  }
  getTransfertSoldeLoggedUsername(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${username}`);
  }
  

}
