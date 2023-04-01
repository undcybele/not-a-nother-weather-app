import { Component, OnInit } from '@angular/core';
import {GeolocationApiService} from "../../services/geolocation-api.service";
import {Observable, map} from "rxjs";
import {Feature} from "../../models/GeolocationApiResponse";
import {FormControl} from '@angular/forms';
import {OpenWeatherApiService} from "../../services/open-weather-api.service";
import {LocalstorageService} from "../../services/localstorage.service";
import {LocationModel} from "../../models/Location.model";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchControl = new FormControl('')
  options$: Observable<Array<Feature>> = new Observable<Array<Feature>>()
  selectedLocation: LocationModel | undefined;

  constructor(
    private readonly _locationService: GeolocationApiService,
    private readonly _openWeatherService: OpenWeatherApiService,
    private readonly _localStorageService: LocalstorageService,
  ) {}

  ngOnInit(): void {}

  setSelectedLocation(option: Feature) {
    this.selectedLocation = {
      id: option.id,
      name: option.place_name,
      coordinates: option.center
    } as LocationModel
    this._locationService.setCurrLocation(this.selectedLocation)
    this._openWeatherService.getWeatherData().then();
  }

  handleSearch() {
    //TODO: check if key is alphanumeric first so the api doesn't get triggered by arrows
    this.options$ = this._locationService.getLocationsOptions(this.searchControl.value).pipe(map(data => data.features))
  }

  clearInput() {
    this.searchControl.setValue('')
  }
}
