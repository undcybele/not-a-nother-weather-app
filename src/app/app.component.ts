import {Component, OnInit} from '@angular/core';
import {OpenWeatherApiService} from "./service/open-weather-api.service";
import {Observable} from "rxjs";
import {OpenWeatherApiResponse} from "./model/OpenWeatherApiResponse";
import {GeolocationApiService} from "./service/geolocation-api.service";
import {GeolocationApiResponse} from "./model/GeolocationApiResponse";
import {getCurrentHour} from "./utils/time-utils";

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
  // currentLocation = this._localStorageService.getCurrentLocation()

  constructor(
    readonly _weatherService: OpenWeatherApiService,
    private readonly _locationService: GeolocationApiService,
    // private readonly _localStorageService: LocalstorageService
  ) {}

  ngOnInit(): void {
    // console.log(this.currentLocation.name)
    this._weatherService.getWeatherData(45.75, 21.22) //initially for Timi
    this.weatherData$ = this._weatherService.weatherData$
    this.locationData$ = this._locationService.locationData$
  }
}
