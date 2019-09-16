import { Component, OnInit, Input } from '@angular/core';

import { StationListService } from '../../services/station-list.service'

@Component({
  selector: 'app-closest-stations',
  templateUrl: './closest-stations.component.html',
  styleUrls: ['./closest-stations.component.scss'],
})
export class ClosestStationsComponent implements OnInit {

	closestStations: any;

	@Input() limit: number = 3

  constructor(private stationService: StationListService) {}

  ngOnInit() {
  	this.stationService.getClosestStations(this.limit)
    .subscribe(data => {
      this.closestStations = data;
    });
  }
}
