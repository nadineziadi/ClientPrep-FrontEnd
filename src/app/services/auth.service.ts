import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const AUTH_API = "http://localhost:9093/api/auth/";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}


//  Authentifier 
  login(credentials): Observable<any> 
  {
    return this.http.post(
      AUTH_API + "signin",
      { 
        username: credentials.username,
        password: credentials.password,
      },
      httpOptions
    );
  }

  
// Inscription 
  register(user): Observable<any> {
    return this.http.post(
      AUTH_API + "signup",
      {
        username: user.username,
        telephone: user.telephone,
        password: user.password,
      },
      httpOptions
    );
  }
}
