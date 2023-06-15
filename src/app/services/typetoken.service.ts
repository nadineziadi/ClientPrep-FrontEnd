import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Typetoken } from '../models/typetoken';
import {  map  } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TypetokenService {

  private baseUrl = 'http://localhost:9093/api/test/typetokens';
  private baseUrlByUser = 'http://localhost:9093/api/test/typetokensByUser';

  constructor(private http: HttpClient) { }

  getTypeToken(id: number): Observable<any> {
    return this.http.get(this.baseUrl+'/getTypeToken/'+id);
  }

  saveTypeToken(typeToken: Object): Observable<Object> {
    return this.http.post(this.baseUrl + '/saveTypeToken', typeToken);
  }

 

  deleteTypeToken(id: number): Observable<any> {
    return this.http.delete(this.baseUrl+'/deleteTypeToken/'+id, { responseType: 'text' });
  }

  getTypeTokenList(): Observable<Typetoken[]> {
    return this.http.get(this.baseUrl + '/getAllTypeToken').pipe(
      map((response:any) => response as Typetoken[])
    );
  }

  getTypetokensByUserList(): Observable<any> {
    return this.http.get(`${this.baseUrlByUser}`);
  }

}
