import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss']
})
export class RoadmapComponent implements OnInit {

  @Input() showDeparture = true;

  presentJourney = {
    stations: [
      {
        name: 'Solothurn',
        departure: '09:34'
      },
      {
        name: 'Olten',
        departure: '10:08'
      },
      {
        name: 'Turgi',
        departure: '10:35'
      },
      {
        name: 'Baden',
        departure: '11:15'
      },
      {
        name: 'Brugg',
        departure: '11:46'
      }
    ]
  }

  constructor() { }

  ngOnInit(): void {
  }

}
