import { Component, OnInit } from '@angular/core';
import {LocalstorageService} from "../../services/localstorage.service";
import {GeolocationApiService} from "../../services/geolocation-api.service";
import {LocationModel} from "../../models/Location.model";
import {OpenWeatherApiService} from "../../services/open-weather-api.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(
    readonly _localStorageService: LocalstorageService,
    private readonly _geolocationService: GeolocationApiService,
    private readonly _openWeatherService: OpenWeatherApiService,
  ) { }

  ngOnInit(): void {
  }

  removeFromFavorites(id: string) {
    return this._localStorageService.removeFavoriteLocation(id)
  }

  setAsCurrLocation(location: LocationModel){
    this._geolocationService.setCurrLocation(location)
    this._openWeatherService.getWeatherData().then()
  }
}
