import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {getUnixTimestamp} from "../utils/time-utils";
import {OpenWeatherApiResponse} from "../models/OpenWeatherApiResponse";
import {firstValueFrom, map, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {LocalstorageService} from "./localstorage.service";
import {GeolocationApiService} from "./geolocation-api.service";

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherApiService {
  WeatherApiKey = environment.weatherApiKey
  weatherRootUrl = "https://history.openweathermap.org/data/2.5/history/city"

  weatherData$: Observable<OpenWeatherApiResponse> = new Observable<OpenWeatherApiResponse>()
  currentWeather?: OpenWeatherApiResponse;
  timestamp = getUnixTimestamp()

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _geolocationService: GeolocationApiService,
    private readonly _localStorageService: LocalstorageService
  ) {}

  buildUrl() {
    const coordinates = this._geolocationService.currentLocation$.value.coordinates;
    return `${this.weatherRootUrl}?lat=${coordinates[1].toFixed(2)}&lon=${coordinates[0].toFixed(2)}&type=hour&start=${this.timestamp.start}&end=${this.timestamp.end}&units=metric&appid=${this.WeatherApiKey}`
  }

  async getWeatherData() {
    const url = this.buildUrl()
    this.currentWeather = await firstValueFrom(this._httpClient.get<OpenWeatherApiResponse>(url))
  }
}
