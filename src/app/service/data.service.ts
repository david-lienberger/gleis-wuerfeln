import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Station} from "../model/Station";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private $newJourney = new Subject<boolean>();
  private $nextStation = new Subject<string>();
  private $nextTrack = new Subject<string>();

  constructor() { }

  public newJourney(): void {
    this.$newJourney.next(true);
  }

  public getNewJourney(): Observable<boolean> {
    return this.$newJourney.asObservable();
  }

  public setNextStation(station: string): void {
    console.log('new station', station)
    this.$nextStation.next(station);
  }

  public getNextStation(): Observable<string> {
    return this.$nextStation.asObservable();
  }

  public setNextTrack(track: string): void {
    console.log('new track', track)
    this.$nextTrack.next(track);
  }

  public getNextTrack(): Observable<string> {
    return this.$nextTrack.asObservable();
  }

}
