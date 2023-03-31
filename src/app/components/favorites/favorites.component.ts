import { Component, OnInit } from '@angular/core';
import {LocalstorageService} from "../service/localstorage.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(private readonly _localStorageService: LocalstorageService) { }
  favoriteLocations: Array<any> = []

  ngOnInit(): void {
    this.favoriteLocations = this._localStorageService.getAllFavoriteLocations()
  }

}
