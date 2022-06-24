import { Component, OnInit } from '@angular/core';
import {DataService} from "../../service/data.service";
import {TransportApiService} from "../../service/transport-api.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  track: number = 0;
  stations: number = 0;
  currentStation: string = '';

  highestTrack: number = 0;

  constructor(private _dataService: DataService, private _apiService: TransportApiService) { }

  ngOnInit(): void {
  }

  public newJourney(): void {
    this._dataService.newJourney();
    localStorage.setItem('future-connection', '');
    localStorage.setItem('future-station', '');
    localStorage.setItem('stations', '');
  }

  public newTrack(): void {
    let max = this.highestTrack;
    this.track = Math.floor(Math.random() * (max - 1) + 1);
  }

  public newStation(): void {
    let max = 10;
    this.stations = Math.floor(Math.random() * (max - 1) + 1);
  }

  public getConnections() {
    this.highestTrack = 0;
    this._apiService.getConnections(this.currentStation).subscribe((data) => {
      for (let station of data.stationboard) {
        if (station.stop.platform !== null && station.stop.platform.length > 3 && station.stop.platform[2] === '/') {
          let track: string = station.stop.platform[0] + "" + station.stop.platform[1];

          if (parseInt(track) > this.highestTrack) {
            this.highestTrack = parseInt(track);
          }
        } else {
          if (parseInt(station.stop.platform) > this.highestTrack) {
            this.highestTrack = station.stop.platform;
          }
        }
      }
    })
  }

}
