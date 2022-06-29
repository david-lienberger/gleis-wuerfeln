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

  futureTrainTrack: string;
  futureDestination: string;

  departure: Date;
  location: string = '';
  journeyStarted: boolean = false;
  nextChange: Date;

  autoCompletion: any[];

  constructor(private _dataService: DataService, private _apiService: TransportApiService) { }

  ngOnInit(): void {
    this.futureTrainTrack = localStorage.getItem('future-connection');
    this.futureDestination = localStorage.getItem('future-station');
    this.journeyStarted = localStorage.getItem('journey-started') === "true";
    this.nextChange = new Date(localStorage.getItem('next-change'));
    this.location = localStorage.getItem('current-location');

    setInterval(() => {
      this.checkArrived()
      console.log('checking')
    }, 3000)
  }

  private checkArrived(): void {
    const now: Date = new Date();
    const nextChange: Date = new Date(this.nextChange);
    if (this.journeyStarted && (nextChange.getDate() >= now.getDate() && this.nextChange <= now)) {
      this.currentStation = this.futureDestination;
      this.getConnections();
    }
  }

  public newJourney(): void {
    this._dataService.newJourney();
    localStorage.clear();
    this.journeyStarted = false;
  }

  public newTrack(): void {
    if (this.currentStationObj !== undefined && this.journeyStarted === false) {
      let random = Math.floor(Math.random() * this.tracks.length);
      this.track = this.tracks[random];

      for (let station of this.currentStationObj.stationboard) {
        if (parseInt(station.stop.platform) === this.track) {
          this.maxStations = station.passList.length -1;

          if (this.stations > this.maxStations) {
            this.stations = this.maxStations;
          }

          this.getFutureJourneyInformation();
        }
      }
    }
  }

  public newStation(): void {
    if (this.currentStationObj !==  undefined && this.journeyStarted === false) {
      let max = this.maxStations;
      this.stations = Math.floor(Math.random() * (max) + 1);
      this.getFutureJourneyInformation();
    }
  }

  private getFutureJourneyInformation(): void {
    for (let station of this.currentStationObj.stationboard) {
      if (parseInt(station.stop.platform) === this.track) {
        let departureTime: Date = new Date(station.stop.departure);
        this.futureDestination = station.passList[this.stations].location.name;
        this.futureTrainTrack = station.category.toString() + station.number.toString() + ", " +
          DashboardComponent.displayTime(departureTime) + " Uhr, Gleis " + station.stop.platform;

        this.departure = station.stop.departure;

        this.nextChange = station.passList[this.stations].arrival;

        localStorage.setItem('next-change', this.nextChange.toString());
        localStorage.setItem('future-connection', this.futureTrainTrack);
        localStorage.setItem('future-station', this.futureDestination);
      }
    }
  }

  public autoComplete(): void {
    this.track = 0;
    this.stations = 0;
    this._apiService.autocompletion(this.currentStation).subscribe((data) => {
      this.autoCompletion = data.filter(function (value) {
        return value.iconclass.split('-').includes('train');
      })
    })

    this.getConnections();
  }

  public getConnections() {
    this.tracks = [];
    this._apiService.getConnections(this.currentStation).subscribe((data) => {
      this.currentStationObj = data;
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

  public startJourney(): void {
    this.journeyStarted = true;
    this.location = this.currentStationObj.station.name;

    localStorage.setItem('current-location', this.location)

    localStorage.setItem('stations', JSON.stringify([{
      name: this.location,
      departure: this.departure
    }]))

    localStorage.setItem('journey-started', 'true');

  }

}
