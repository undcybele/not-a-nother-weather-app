import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {getUnixTimestamp} from "../utils/time-utils";
import {OpenWeatherApiResponse} from "../model/OpenWeatherApiResponse";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherApiService {
  WeatherApiKey = environment.weatherApiKey
  weatherRootUrl = "https://history.openweathermap.org/data/2.5/history/city"

  weatherData$: Observable<OpenWeatherApiResponse> = new Observable<OpenWeatherApiResponse>()
  timestamp = getUnixTimestamp()

  constructor(private readonly _httpClient: HttpClient) {}

  buildUrl(lat: number, long: number) {
    console.log(lat, long)
    return `${this.weatherRootUrl}?lat=${lat.toFixed(2)}&lon=${long.toFixed(2)}&type=hour&start=${this.timestamp.start}&end=${this.timestamp.end}&units=metric&appid=${this.WeatherApiKey}`
  }

  getWeatherData(lat: number, long: number) {
    let ur = this.buildUrl(lat, long)
    console.log(ur)
    this.weatherData$ = this._httpClient.get<OpenWeatherApiResponse>(ur)
  }
}
