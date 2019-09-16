import { Component, OnInit } from '@angular/core';

import { StationListService } from '../../services/station-list.service';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.scss']
})
export class StationsComponent implements OnInit {

	stations: any;

  constructor(private stationService: StationListService) {}

  ngOnInit() {
    this.stationService.getStationList()
    .subscribe(data => {
      this.stations = data;
    });
  }
}
