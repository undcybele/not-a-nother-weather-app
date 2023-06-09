import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Feature, GeolocationApiResponse} from "../models/GeolocationApiResponse";
import {environment} from "../../environments/environment";
import {LocationModel} from "../models/Location.model";

@Injectable({
  providedIn: 'root'
})
export class GeolocationApiService {
  geolocationApiKey = environment.geolocationApiKey
  geolocationRootUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"

  locationData$: Observable<GeolocationApiResponse> = new Observable<GeolocationApiResponse>()
  currentLocation$: BehaviorSubject<LocationModel> = new BehaviorSubject<LocationModel>({id:"place.23185600", name: 'Timișoara, Timiș, România', coordinates: [21.22, 45.7]});

  constructor(private readonly _httpClient: HttpClient) {}

  getLocationsOptions(input: string): Observable<GeolocationApiResponse> {
    const url = `${this.geolocationRootUrl}${input}.json?access_token=${this.geolocationApiKey}`
    return this._httpClient.get<GeolocationApiResponse>(url)
  }

  setCurrLocation(location: LocationModel) {
    this.currentLocation$.next(location)
  }
}
