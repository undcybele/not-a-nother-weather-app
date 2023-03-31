import { Component, OnInit } from '@angular/core';
import {LocalstorageService} from "../../services/localstorage.service";
import {GeolocationApiService} from "../../services/geolocation-api.service";
import {LocationModel} from "../../models/Location.model";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(
    readonly _localStorageService: LocalstorageService,
    private readonly _geolocationService: GeolocationApiService
  ) { }

  ngOnInit(): void {
  }

  removeFromFavorites(location: LocationModel) {
    return this._localStorageService.removeFavoriteLocation(location)
  }
}
