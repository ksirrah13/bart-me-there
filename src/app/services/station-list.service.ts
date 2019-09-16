import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class StationListService {

  stations: any;
  apiKey = 'MW9S-E7SL-26DU-VV8V';
  apiUrl = 'http://api.bart.gov/api/stn.aspx';

  current = this.makeLatLng('37.702152', '-121.935791');

  constructor(private http: HttpClient) {
  
  }

  getStationList() {
  	if (this.stations) {
  		console.log("read from stored: " + this.stations);
  		return of(this.stations);
  	}
  	return this.http.get(this.apiUrl + '?cmd=stns' 
  		+ '&key=' + this.apiKey
  		+ '&json=y')
  	.pipe(map((data: any) => data.root.stations.station));
  }

  rad(x) { return x * Math.PI / 180; }

  // https://stackoverflow.com/questions/1502590/calculate-distance-between-two-points-in-google-maps-v3
  getDistance(p1, p2) {
	  var R = 6378137; // Earth’s mean radius in meter
	  var dLat = this.rad(p2.lat - p1.lat);
	  var dLong = this.rad(p2.long - p1.long);
	  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
	    Math.cos(this.rad(p1.lat)) * Math.cos(this.rad(p2.lat)) *
	    Math.sin(dLong / 2) * Math.sin(dLong / 2);
	  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	  var d = R * c;
	  return d; // returns the distance in meter
	}

	makeLatLng(latitude, longitude) {
		return {
			lat: latitude,
			long: longitude
		}
	}

	getClosestStations(limit = 10) {
		
		return this.getStationList().pipe(
			map((stations: any) => {
				return stations.sort((a: any, b: any) => {
					const latLngA = this.makeLatLng(a.gtfs_latitude, a.gtfs_longitude);
					const latLngB = this.makeLatLng(b.gtfs_latitude, b.gtfs_longitude);
					return this.getDistance(this.current, latLngA) - this.getDistance(this.current, latLngB);
				})}))
		.pipe(map(result => result.slice(0, limit)));
	}

}
