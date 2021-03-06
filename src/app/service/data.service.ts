import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private $newJourney = new Subject<boolean>();

  constructor() { }

  public newJourney(): void {
    this.$newJourney.next(true);
  }

  public getNewJourney(): Observable<boolean> {
    return this.$newJourney.asObservable();
  }

}
