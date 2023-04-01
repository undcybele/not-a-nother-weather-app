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

  removeFavoriteLocation(id: string){
    let updated_favorites = []
    const curr_favorites = localStorage.getItem('favorites')
    if(!curr_favorites) return false
    else {
      updated_favorites = [...JSON.parse(curr_favorites)].filter(l => l.id !== id)
    }
    localStorage.setItem('favorites', JSON.stringify(updated_favorites))
    this.favoriteLocations$.next(updated_favorites)
    return true;
  }

  checkIfFavorite(id: string){
    return localStorage.getItem('favorites')?.includes(id)
  }

}
