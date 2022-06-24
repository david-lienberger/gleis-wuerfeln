import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-present-journey',
  templateUrl: './present-journey.component.html',
  styleUrls: ['./present-journey.component.scss']
})
export class PresentJourneyComponent implements OnInit {

  futureTrainTrack: string = localStorage.getItem('future-connection');
  futureDestination: string = localStorage.getItem('future-station');

  constructor() { }

  ngOnInit(): void {
  }

  public newJourney(): void {
    localStorage.setItem('future-connection', '');
    localStorage.setItem('future-station', '');
    localStorage.setItem('stations', '');
  }

}
