import {Component, Input, OnInit} from '@angular/core';
import {Journey} from "../../model/Journey";
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss']
})
export class RoadmapComponent implements OnInit {

  @Input() showDeparture = true;
  departure: Date = new Date(localStorage.getItem('departure'));
  nextChange: Date = new Date(localStorage.getItem('next-change'));
  now: Date = new Date();
  timeNeeded: number;

  currentPosition: number;

  presentJourney: Journey = {
    stations: []
  }

  constructor(private _dataService: DataService) { }

  ngOnInit(): void {
    this.presentJourney.stations = JSON.parse(localStorage.getItem('stations'));

    this._dataService.getNewJourney().subscribe(() => {
      this.presentJourney.stations = [];
    })

    let timePassed: number = 0;

    if (this.departure <= new Date()) {
      timePassed = (new Date().getTime() - this.departure.getTime()) /1000;
    }

    this.timeNeeded = ((this.nextChange.getTime() - this.departure.getTime()) /1000) -timePassed;

    this.currentPosition = (this.timeNeeded - timePassed) / 35;

    setInterval(() => {
      this.now = new Date()
    }, 10000)

  }
}
