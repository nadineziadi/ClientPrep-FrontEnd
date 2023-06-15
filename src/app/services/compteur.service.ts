import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CompteurService {
  private baseUrl = "http://localhost:9093/api/test/compteurs";

  constructor(private http: HttpClient) {}

  getCompteur(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getCompteur/${id}`);
  }
  // ajouter et modifier
  saveCompteur(compteur: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/saveCompteur`, compteur);
  }

  getCompteursByClient(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getCompteurByClient`);
  }

  deleteCompteur(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteCompteur/${id}`, {
      responseType: "text",
    });
  }

  getCompteursList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
