import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-future-journey',
  templateUrl: './future-journey.component.html',
  styleUrls: ['./future-journey.component.scss']
})
export class FutureJourneyComponent implements OnInit {

  futureTrainTrack: string = localStorage.getItem('future-connection');
  futureDestination: string = localStorage.getItem('future-station');

  constructor() { }

  ngOnInit(): void {
  }

}
