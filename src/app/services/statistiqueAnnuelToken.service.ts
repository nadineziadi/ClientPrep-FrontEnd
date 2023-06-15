import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatistiqueAnnuelToken } from '../models/statistiqueAnnuelToken';


@Injectable({
  providedIn: 'root'
})
export class StatistiqueAnnuelTokenService {

  private baseUrl = 'http://localhost:9093/api/test/statistiqueAnnuelsToken';
//inject the http client dependency which will be used to make http requests.
  constructor(private http: HttpClient) { }

  getStatToken()
  {
    //expects an array of StatistiqueAnnuelToken objects in the response. 
    return this.http.get<StatistiqueAnnuelToken[]>(this.baseUrl);
  }
  getStatistiqueAnnuelsList(): Observable<any> {
    // It is used for fetching the list of statistics.
    return this.http.get(`${this.baseUrl}`);
  }

  getChartStatsVenteToken():Observable<any>
  {
    return this.http.get(this.baseUrl + '/getStatsVenteToken');

  }
}
