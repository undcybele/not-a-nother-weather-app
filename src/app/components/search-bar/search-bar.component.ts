import { Component, OnInit } from '@angular/core';
import {GeolocationApiService} from "../service/geolocation-api.service";
import {Observable, map} from "rxjs";
import {Feature} from "../model/GeolocationApiResponse";
import {FormControl} from '@angular/forms';
import {OpenWeatherApiService} from "../service/open-weather-api.service";
import {LocalstorageService} from "../service/localstorage.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchControl = new FormControl('')
  options$: Observable<Array<Feature>> = new Observable<Array<Feature>>()
  selectedLocation: Feature | undefined;

  constructor(
    private readonly _locationService: GeolocationApiService,
    private readonly _openWeatherService: OpenWeatherApiService,
    private readonly _localStorageService: LocalstorageService,
  ) {}

  ngOnInit(): void {}

  setSelectedLocation(option: Feature) {
    this.selectedLocation = option
    this._localStorageService.setCurrentLocation(option)
    // this._openWeatherService.getWeatherData(option.center[1], option.center[0])
  }

  handleSearch() {
    //TODO: check if key is alphanumeric first so the api doesn't get triggered by arrows
    this.options$ = this._locationService.getLocations(this.searchControl.value).pipe(map(data => data.features))
  }
}
