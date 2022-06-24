import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TransportApiService {

  constructor(private _http: HttpClient) { }

  getConnections(station: string): Observable<any> {
    return this._http.get<any>("http://transport.opendata.ch/v1/stationboard?station=" + station);
  }

  getConnectionStation(start: string, end: string): Observable<any> {
    return this._http.get("http://transport.opendata.ch/v1/connections?from=" + start + "&to=" + end)
  }
}
