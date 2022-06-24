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
  currentStationObj: any;

  highestTrack: number = 0;
  maxStations: number = 0;

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

    for (let station of this.currentStationObj.stationboard) {
      if (parseInt(station.stop.platform) === this.track) {
        this.maxStations = station.passList.length -1;
      }
    }
  }

  public newStation(): void {
    let max = this.maxStations;
    this.stations = Math.floor(Math.random() * (max - 1) + 1);
  }

  public getConnections() {
    this.highestTrack = 0;
    this._apiService.getConnections(this.currentStation).subscribe((data) => {
      this.currentStationObj = data;
      for (let station of data.stationboard) {
        if (this.parseTrack(station.stop.platform) > this.highestTrack) {
          this.highestTrack = station.stop.platform;
        }
      }
    })
  }

  public parseTrack(track: string): number {
    if (track.length === 1) {
      return parseInt(track);
    } else if (track[1].match("[a-zA-Z]")) {
      return parseInt(track[0]);
    } else {
      return (parseInt(track[0].toString() + track[1].toString()));
    }
  }

}
