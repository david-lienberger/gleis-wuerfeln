import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-future-journey',
  templateUrl: './future-journey.component.html',
  styleUrls: ['./future-journey.component.scss'],
  animations: [
    trigger('slideRightInOut', [
      transition(':enter', [
        style({
          transform: 'translateX(-100%)'
        }),
        animate('500ms ease-in', style({
          transform: 'translateX(-0%)'
        }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({
          transform: 'translateX(-300%)'
        }))
      ])
    ]),
    trigger('slideLeftInOut', [
      transition(':enter', [
        style({
          transform: 'translateX(100%)'
        }),
        animate('500ms ease-in', style({
          transform: 'translateX(0%)'
        }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({
          transform: 'translateX(300%)'
        }))
      ])
    ])
  ]
})
export class FutureJourneyComponent implements OnChanges {

  @Input() futureTrainTrack: string = '';
  @Input() futureDestination: string = '';
  @Input() changeTime: Date;

  @Input() xCoords: number = 8.224;
  @Input() yCoords: number = 46.825;

  url: string = '';

  tipTrainTrack: string = 'Diese Verbindung bringt dich an dein nächstes Zwischenziel.';
  tipDestination: string = 'Dies ist dein nächstes Zwischenziel.';
  tipChange: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    this.tipChange = 'Um diese Zeit steigst du in ' + this.futureDestination + ' um.';
    this.url = 'https://www.openstreetmap.org/export/embed.html?bbox=' + this.yCoords + '%2C' + this.xCoords;
  }

}
