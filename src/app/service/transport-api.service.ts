import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TransportApiService {

  constructor(private _http: HttpClient) { }

  getConnections(station: string): Observable<any> {
    return this._http.get<any>("https://transport.opendata.ch/v1/stationboard?station=" + station + "&limit=10");
  }
}
