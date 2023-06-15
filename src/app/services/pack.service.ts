import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackService {

  private baseUrl = 'http://localhost:9093/api/test/packs';


  constructor(private http: HttpClient) { }

  getCarteRecharge(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }


  getPacksMarchand(): Observable<any> {
    return this.http.get(this.baseUrl + '/getPackMarchand');
  }

UpdatePack(value : any , id : number ) : Observable <any>{
  return this.http.post(`${this.baseUrl}/${id}`, value) ;

}


}
