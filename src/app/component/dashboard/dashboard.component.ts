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

  maxStations: number = 0;

  tracks: number[] = [];

  futureTrainTrack: string = localStorage.getItem('future-connection');
  futureDestination: string = localStorage.getItem('future-station');

  constructor(private _dataService: DataService, private _apiService: TransportApiService) { }

  ngOnInit(): void {
    localStorage.setItem('stations', JSON.stringify(
      [{
        name: "bern",
        departure: "12:03",
      },
        {
          name: "wichtrach",
          departure: "13:45",
        },
        {
          name: "thun",
          departure: "14:14"
        }]
    ))
  }

  public newJourney(): void {
    this._dataService.newJourney();
    localStorage.setItem('future-connection', '');
    localStorage.setItem('future-station', '');
    localStorage.setItem('stations', '');
  }

  public newTrack(): void {
    console.log(this.tracks)

    let random = Math.floor(Math.random() * this.tracks.length);
    this.track = this.tracks[random];

    for (let station of this.currentStationObj.stationboard) {
      if (parseInt(station.stop.platform) === this.track) {
        this.maxStations = station.passList.length -1;
      }
    }
  }

  public newStation(): void {
    let max = this.maxStations;
    this.stations = Math.floor(Math.random() * (max) + 1);
    this.getFutureJourneyInformation();
  }

  private getFutureJourneyInformation() {
    for (let station of this.currentStationObj.stationboard) {
      if (parseInt(station.stop.platform) === this.track) {
        let departureTime: Date = new Date(station.stop.departure);
        this.futureDestination = station.passList[this.stations].location.name;
        this.futureTrainTrack = station.category.toString() + station.number.toString() + ", " +
          DashboardComponent.displayTime(departureTime) + " Uhr, Gleis " + station.stop.platform;

        this._dataService.setNextStation(this.futureDestination);
        this._dataService.setNextTrack(this.futureTrainTrack);
      }
    }
  }

  public getConnections() {
    this.tracks = [];
    this._apiService.getConnections(this.currentStation).subscribe((data) => {
      this.currentStationObj = data;
      console.log(data)
      for (let station of data.stationboard) {
        this.tracks.push(DashboardComponent.parseTrack(station.stop.platform));
      }
    })
  }

  private static parseTrack(track: string): number {
    if (track.length === 1) {
      return parseInt(track);
    } else if (track[1].match("[a-zA-Z]")) {
      return parseInt(track[0]);
    } else {
      return (parseInt(track[0].toString() + track[1].toString()));
    }
  }

  private static displayTime(time: Date): string {
    if (time.getMinutes() >= 10) {
      return 'XX:' + time.getMinutes();
    } else {
      return 'XX:0' + time.getMinutes();
    }
  }

}
