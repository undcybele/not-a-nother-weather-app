import { Injectable } from '@angular/core';
import {Feature} from "../model/GeolocationApiResponse";

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  addNewLocationToFavorites(location: Feature) {
    let updated_favorites = []
    let curr_favorites = localStorage.getItem('favorites')
    let newFavoriteLocation = {name: location.text, coordinates: location.center}
    if(!curr_favorites){
      updated_favorites.push(newFavoriteLocation)
    }
    else {
      updated_favorites.push(newFavoriteLocation, ...JSON.parse(curr_favorites))
    }
    localStorage.setItem('favorites', JSON.stringify(updated_favorites))
    return 1;
  }

  getAllFavoriteLocations(){
    let locations = localStorage.getItem('favorites')
    return locations ? JSON.parse(locations) : []
  }

  setCurrentLocation(location: Feature) {
    localStorage.setItem('currentLocation', JSON.stringify({name: location.text, coordinates: location.center}))
  }

  getCurrentLocation(){
    let location = localStorage.getItem('currentLocation')
    return location ? JSON.parse(location) : {}
  }
}
