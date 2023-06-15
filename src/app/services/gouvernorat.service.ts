import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GouvernoratService {

  private baseUrl = 'http://localhost:9093/api/test/gouvernorats';

  constructor(private http: HttpClient) { }

  getGouvernorat(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createGouvernorat(gouvernorat: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, gouvernorat);
  }

  updateGouvernorat(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteGouvernorat(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getGouvernoratsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

}
