import {Component, OnInit} from '@angular/core';
import {OpenWeatherApiService} from "./services/open-weather-api.service";
import {Observable} from "rxjs";
import {OpenWeatherApiResponse} from "./models/OpenWeatherApiResponse";
import {GeolocationApiService} from "./services/geolocation-api.service";
import {GeolocationApiResponse} from "./models/GeolocationApiResponse";
import {getCurrentHour} from "./utils/time-utils";
import {LocalstorageService} from "./services/localstorage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'not_a_weather_app';

  weatherData$: Observable<OpenWeatherApiResponse> = new Observable<OpenWeatherApiResponse>()
  locationData$: Observable<GeolocationApiResponse> = new Observable<GeolocationApiResponse>()
  currentHour = getCurrentHour()

  constructor(
    readonly _weatherService: OpenWeatherApiService,
    readonly _geolocationService: GeolocationApiService,
    readonly _localStorageService: LocalstorageService,
  ) {}

  ngOnInit(): void {
    this._weatherService.getWeatherData().then()
    this.weatherData$ = this._weatherService.weatherData$
  }

  isFavorite(){
    return this._localStorageService.checkIfFavorite(this._geolocationService.currentLocation$.value)
  }

  addToFavorites() {
    return this._localStorageService.addFavoriteLocation(this._geolocationService.currentLocation$.value)
  }

  removeFromFavorites() {
    return this._localStorageService.removeFavoriteLocation(this._geolocationService.currentLocation$.value)
  }
}
