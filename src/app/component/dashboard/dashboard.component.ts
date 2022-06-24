import { Component, OnInit } from '@angular/core';
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  track: number = 0;
  stations: number = 0;

  constructor(private _dataService: DataService) { }

  ngOnInit(): void {
  }

  public newJourney(): void {
    this._dataService.newJourney();
    localStorage.setItem('future-connection', '');
    localStorage.setItem('future-station', '');
    localStorage.setItem('stations', '');
  }

  public newTrack(): void {
    let max = 10;
    this.track = Math.floor(Math.random() * (max - 1) + 1);
  }

  public newStation(): void {
    let max = 10;
    this.stations = Math.floor(Math.random() * (max - 1) + 1);
  }

}
