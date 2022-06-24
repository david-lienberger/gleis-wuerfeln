import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Station} from "../model/Station";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private $stations = new Subject<Station[]>();
  private $futureStation = new Subject<string>();
  private $futureConnection = new Subject<string>();

  constructor() { }

  public setStations(stations: Station[]): void {
    this.$stations.next(stations);
  }

  public getStations(): Observable<Station[]> {
    return this.$stations.asObservable();
  }

  public setFutureStation(station: string): void {
    this.$futureStation.next(station);
  }

  public getFutureStation(): Observable<string> {
    return this.$futureStation.asObservable();
  }

  public setFutureConnection(connection: string): void {
    this.$futureConnection.next(connection);
  }

  public getFutureConnection(): Observable<string> {
    return this.$futureConnection.asObservable();
  }
}
