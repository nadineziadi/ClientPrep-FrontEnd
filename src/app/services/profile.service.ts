import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = 'http://localhost:9093/api/test/profiles';
  private baseUrlByUser = 'http://localhost:9093/api/test/profilesByUser';

  constructor(private http: HttpClient) { }

  getProfile(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }


  updateProfile2(telephone:string,password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${telephone}`,password);
  }

  getProfilesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getProfilesByUserList(): Observable<any> {
    return this.http.get(`${this.baseUrlByUser}`);
  }

  updateLoggedProfile( value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/updateProfile`, value);
  }

  getLoggedProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getProfile`);
  }
}
