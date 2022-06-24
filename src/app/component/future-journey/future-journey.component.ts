import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-future-journey',
  templateUrl: './future-journey.component.html',
  styleUrls: ['./future-journey.component.scss']
})
export class FutureJourneyComponent implements OnInit {

 futureTrainTrack: string;
  futureDestination: string;

  constructor(private _dataService: DataService) { }

  ngOnInit(): void {
    this._dataService.getNextStation().subscribe((data) => {
      this.futureDestination = data;
    })

    this._dataService.getNextTrack().subscribe((data) => {
      this.futureTrainTrack = data;
    })
  }

}
