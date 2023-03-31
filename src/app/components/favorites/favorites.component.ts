import { Component, OnInit } from '@angular/core';
import {LocalstorageService} from "../../services/localstorage.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(readonly _localStorageService: LocalstorageService) { }

  ngOnInit(): void {

  }

}
