import { Injectable } from '@angular/core';
import {LocationModel} from "../models/Location.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  favoriteLocations$: BehaviorSubject<Array<LocationModel>> = new BehaviorSubject<Array<LocationModel>>(this.getAllFavoriteLocations())
  constructor() { }

  getAllFavoriteLocations(){
    const locations = localStorage.getItem('favorites')
    return locations ? JSON.parse(locations) : []
  }

  addFavoriteLocation(newFavorite: LocationModel){
    console.log(newFavorite)
    const updated_favorites = []
    const curr_favorites = localStorage.getItem('favorites')
    if(!curr_favorites){
      updated_favorites.push(newFavorite)
    }
    else {
      updated_favorites.push(newFavorite, ...JSON.parse(curr_favorites))
    }
    localStorage.setItem('favorites', JSON.stringify(updated_favorites))
    this.favoriteLocations$.next(updated_favorites)
    return true;
  }

  removeFavoriteLocation(favorite: LocationModel){
    let updated_favorites = []
    const curr_favorites = localStorage.getItem('favorites')
    if(!curr_favorites){
      updated_favorites.push(favorite)
    }
    else {
      updated_favorites = [...JSON.parse(curr_favorites)].filter(l => l.name !== favorite.name)
    }
    localStorage.setItem('favorites', JSON.stringify(updated_favorites))
    this.favoriteLocations$.next(updated_favorites)
    return true;
  }

  checkIfFavorite(location: LocationModel){
    return localStorage.getItem('favorites')?.includes(location.name)
  }

}
