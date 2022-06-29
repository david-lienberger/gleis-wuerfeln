import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-future-journey',
  templateUrl: './future-journey.component.html',
  styleUrls: ['./future-journey.component.scss']
})
export class FutureJourneyComponent implements OnInit {

  @Input() futureTrainTrack: string;
  @Input() futureDestination: string;

  constructor() { }

  ngOnInit(): void { }

}
