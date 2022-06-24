import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-present-journey',
  templateUrl: './present-journey.component.html',
  styleUrls: ['./present-journey.component.scss']
})
export class PresentJourneyComponent implements OnInit {

  futureTrainTrack: string = 'S4, Gleis 3';
  futureDestination: string = 'Rüti';

  constructor() { }

  ngOnInit(): void {
  }

}
