import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-future-journey',
  templateUrl: './future-journey.component.html',
  styleUrls: ['./future-journey.component.scss']
})
export class FutureJourneyComponent implements OnChanges {

  @Input() futureTrainTrack: string;
  @Input() futureDestination: string;
  @Input() changeTime: Date;

  @Input() xCoords: number;
  @Input() yCoords: number;

  url: string = '';

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.url = 'https://www.openstreetmap.org/export/embed.html?bbox=' + this.yCoords + '%2C' + this.xCoords;
  }

}
