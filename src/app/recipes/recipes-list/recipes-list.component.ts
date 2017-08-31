import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../app.reducers";
import { Observable } from "rxjs/Observable";
import { Recipe } from "../../models/recipe";

import { RecipesService } from "../recipes.service";

@Component({
  selector: "app-recipes-list",
  templateUrl: "./recipes-list.component.html",
  styleUrls: ["./recipes-list.component.css"]
})
export class RecipesListComponent implements OnInit {
  recipes$: Observable<Recipe[]>;

  constructor(
    private store: Store<AppState>,
    private service: RecipesService
  ) {}

  ngOnInit() {
    this.recipes$ = this.service.getRecipes();
  }
}