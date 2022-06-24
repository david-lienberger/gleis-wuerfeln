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

  presentJourney: Journey = {
    stations: []
  }

  constructor(private _dataService: DataService) { }

  ngOnInit(): void {
    this.presentJourney.stations = JSON.parse(localStorage.getItem('stations'));

    this._dataService.getNewJourney().subscribe(() => {
      this.presentJourney.stations = [];
    })
  }
}
