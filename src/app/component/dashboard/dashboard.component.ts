import { Component, OnInit } from '@angular/core';
import {DataService} from "../../service/data.service";
import {TransportApiService} from "../../service/transport-api.service";
import {
  trigger,
  style,
  animate,
  transition, state,
} from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({
          transform: 'translateY(-100%)'
        }),
        animate('500ms ease-in', style({
          transform: 'translateY(0%)'
        }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({
          transform: 'translateY(-100%)'
        }))
      ])
    ]),
    trigger('slideUp', [
      state('down', style({
        transform: 'translateY(8rem)'
      })),
      transition('down => up', [
        animate('300ms')
      ]),
      transition('up => down', [
        animate('200ms')
      ])
    ])
  ]
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
  changeActive: boolean = true;
  xCoords: number;
  yCoords: number;

  inTransfer: boolean = false;

  autoCompletion: any[];

  tipStart: string = 'Von hier startest du.';
  tipTrack: string = 'Auf diesem Gleis fährt dein Zug.';
  tipStations: string = 'So viele Haltestellen passierst du.';

  constructor(private _dataService: DataService, private _apiService: TransportApiService) { }

  ngOnInit(): void {
    this.futureTrainTrack = localStorage.getItem('future-connection');
    this.futureDestination = localStorage.getItem('future-station');
    this.journeyStarted = localStorage.getItem('journey-started') === "true";
    this.changeActive = localStorage.getItem('change-active') === "true";
    this.nextChange = new Date(localStorage.getItem('next-change'));
    this.location = localStorage.getItem('current-location');
    this.departure = new Date(localStorage.getItem('departure'));
    this.xCoords = parseFloat(localStorage.getItem('x'));
    this.yCoords = parseFloat(localStorage.getItem('y'));

    this.checkArrived();

    setInterval(() => {
      this.checkArrived();
    }, 5000);


  }

  private checkArrived(): void {
    const now: Date = new Date();
    const nextChange: Date = new Date(this.nextChange);

    if (!this.changeActive && this.journeyStarted && (nextChange <= now)) {
      this.inTransfer = false;

      localStorage.setItem('change-active', 'true')
      this.changeActive = true;

      localStorage.setItem('journey-started', 'false');
      this.journeyStarted = false;

      this.currentStation = this.futureDestination;

      this.getConnections();
    } else if (!this.inTransfer && this.journeyStarted && (this.departure <= now)) {
      this.inTransfer = true;

      localStorage.setItem('change-active', 'false')
      this.changeActive = false;

      localStorage.setItem('journey-started', 'true');
      this.journeyStarted = true;
    }
  }

  public newJourney(): void {
    this._dataService.newJourney();
    localStorage.clear();
    this.journeyStarted = false;
    this.changeActive = false;
    this.inTransfer = false;
    this.currentStation = '';
    this.track = 0;
    this.stations = 0;
  }

  public newTrack(): void {
    if (this.currentStation !== '' && this.journeyStarted === false) {
      let random = Math.floor(Math.random() * this.tracks.length);
      this.track = this.tracks[random];

      for (let station of this.currentStationObj.stationboard) {
        if (parseInt(station.stop.platform) === this.track) {
          this.maxStations = station.passList.length - 1;

          if (this.stations > this.maxStations) {
            this.stations = this.maxStations;
          }

          this.getFutureJourneyInformation();
        }
      }
    }
  }

  public newStation(): void {
    if (this.currentStationObj !==  undefined && this.journeyStarted === false && this.track > 0) {
      let max = this.maxStations;
      this.stations = Math.floor(Math.random() * (max) + 1);
      this.getFutureJourneyInformation();
    }
  }

  private getFutureJourneyInformation(): void {
    for (let station of this.currentStationObj.stationboard) {
      if (parseInt(station.stop.platform) === this.track) {
        let departureTime: Date = new Date(station.stop.departure);
        if (station.passList[this.stations] !== undefined) {
          this.futureDestination = station.passList[this.stations].location.name;

          this.futureTrainTrack = station.category.toString() + station.number.toString() + ", " +
            DashboardComponent.displayTime(departureTime) + " Uhr, Gleis " + station.stop.platform;

          this.departure = station.stop.departure;
          localStorage.setItem('departure', this.departure.toString());

          this.nextChange = station.passList[this.stations].arrival;

          this.xCoords = station.passList[this.stations].location.coordinate.x;
          this.yCoords = station.passList[this.stations].location.coordinate.y;

          if (this.track > 0 && this.stations > 0 && this.nextChange !== null) {
            localStorage.setItem('next-change', this.nextChange.toString());
            localStorage.setItem('future-connection', this.futureTrainTrack);
            localStorage.setItem('future-station', this.futureDestination);
            localStorage.setItem('x', this.xCoords.toString());
            localStorage.setItem('y', this.yCoords.toString());
          }
        }
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

  public getConnections(): void {
    this.tracks = [];
    this._apiService.getConnections(this.currentStation).subscribe((data) => {
      this.currentStationObj = data;
        data.stationboard.reverse();
      for (let station of data.stationboard) {
        this.tracks.push(DashboardComponent.parseTrack(station.stop.platform));
      }
    })
  }

  private static parseTrack(track: string): number {
    if (track !== null) {
      if (track.length === 1) {
        return parseInt(track);
      } else if (track[1].match("[a-zA-Z]")) {
        return parseInt(track[0]);
      } else {
        return (parseInt(track[0].toString() + track[1].toString()));
      }
    }
    return 0;
  }

  private static displayTime(time: Date): string {
      return time.toLocaleTimeString().slice(0, 5);
  }

  public startJourney(): void {
    this.journeyStarted = true;
    this.changeActive = false;
    this.inTransfer = false;
    this.location = this.currentStationObj.station.name;

    let stations: any[] = JSON.parse(localStorage.getItem('stations'));

    if (stations === null) {
      stations = [];

      stations.push({
        name: this.currentStation,
        departure: this.departure
      },{
        name: this.futureDestination,
        departure: this.nextChange
      })
    } else {
      stations.push({
        name: this.futureDestination,
        departure: this.nextChange
      })
    }

    localStorage.setItem('stations', JSON.stringify(stations))
    localStorage.setItem('current-location', this.location);
    localStorage.setItem('change-active', 'false');
    localStorage.setItem('journey-started', 'true');
  }

}
