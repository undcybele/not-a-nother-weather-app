import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GeolocationApiResponse} from "../model/GeolocationApiResponse";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GeolocationApiService {
  geolocationApiKey = environment.geolocationApiKey
  geolocationRootUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"

  locationData$: Observable<GeolocationApiResponse> = new Observable<GeolocationApiResponse>()

  constructor(private readonly _httpClient: HttpClient) {}

  getLocations(input: string): Observable<GeolocationApiResponse> {
    let url = `${this.geolocationRootUrl}${input}.json?access_token=${this.geolocationApiKey}`
    return this._httpClient.get<GeolocationApiResponse>(url)
  }

}
