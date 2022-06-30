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
  timeNeeded: number = 0;
  timePassed: number = 0;
  departed: boolean = false;

  currentPosition: number = 0;

  presentJourney: Journey = {
    stations: []
  }

  constructor(private _dataService: DataService) { }

  ngOnInit(): void {
    this.departed = this.departure <= this.now;
    this.presentJourney.stations = JSON.parse(localStorage.getItem('stations'));

    this._dataService.getNewJourney().subscribe(() => {
      this.presentJourney.stations = [];
    })

    if (this.departure <= new Date()) {
      this.timePassed = (new Date().getTime() - this.departure.getTime()) / 1000;
    }

    this.timeNeeded = ((this.nextChange.getTime() - this.departure.getTime()) / 1000);

    if (this.timePassed > 0) {
      this.currentPosition = (this.timePassed * 35.5) / this.timeNeeded;
    }

    setInterval(() => {
      this.now = new Date();
      this.departed = this.departure <= this.now;
    }, 10000)

  }
}
