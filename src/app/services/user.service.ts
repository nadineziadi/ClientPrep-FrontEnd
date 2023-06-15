import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marchand } from '../models/marchand';
import { MarchandInformations } from '../models/marchandInformations';
import { MarchandInfos } from '../models/marchandInfos';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:9093/api/test/users';
  private API_URL = 'http://localhost:9093/api/test/';
  constructor(private http: HttpClient) { }

  
  getUser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createUser(user: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, user);
  }

  updateUser(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteUser/${id}`, { responseType: 'text' });
  }

  getUsersList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  /*getSoldeUsername(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${username}`);
  }
*/


getAdminBoard(): Observable<any> {
  return this.http.get(this.API_URL + 'admin', { responseType: 'text' });
}

addMarchand(marchand:MarchandInformations)
{
  return this.http.post(this.baseUrl + "/addMarchand",marchand,{responseType:'text'});

}

getAllMarchands(): Observable<any> {
  return this.http.get(this.baseUrl + "/getAllMarchands");
}

getMarchand(id:number):Observable<any> {
  return this.http.get(this.baseUrl + "/getMarchandInfos/"+id);
}

updateMarchand(marchand:MarchandInfos):Observable<any> {
  return this.http.put(this.baseUrl + "/updateMarchand",marchand);
}

blockUser(id:number):Observable<any> {
  return this.http.put(this.baseUrl + "/blockUser/"+id,null,{responseType:'text'});
}

unblockUser(id:number):Observable<any> {
  return this.http.put(this.baseUrl + "/unblockUser/"+id,null,{responseType:'text'});
}

}
