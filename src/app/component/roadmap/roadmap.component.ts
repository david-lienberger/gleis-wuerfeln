import {Component, Input, OnInit} from '@angular/core';
import {Journey} from "../../model/Journey";

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss']
})
export class RoadmapComponent implements OnInit {

  @Input() showDeparture = true;


  presentJourney: Journey = {
    stations: []
  }

  constructor() { }

  ngOnInit(): void {
    this.presentJourney.stations = JSON.parse(localStorage.getItem('stations'));
  }

}
