import { Injectable } from "@angular/core";
import { Recipe } from "../models/recipe";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";

import { Store } from "@ngrx/store";
import { AppState } from "../app.reducers";
import * as RecipesActions from "./recipes.actions";
import * as ShoppingListActions from "../shopping-list/shopping-list.actions";

import "rxjs/add/operator/switchMap";

@Injectable()
export class RecipesService {
  constructor(private store: Store<AppState>) {}

  getRecipes(): Observable<Recipe[]> {
    return this.store
      .select("recipes")
      .map(recipesState => recipesState.recipes);
  }

  getBlankRecipe(): Observable<Recipe> {
    return Observable.of(new Recipe());
  }

  getRecipe(id: number): Observable<Recipe> {
    return this.store
      .select("recipes")
      .map(recipesState => recipesState.recipes.find(r => r.id === id));
  }

  shopRecipe(recipe: Recipe):void {
    let action = new ShoppingListActions.AddRecipe(recipe);
    this.store.dispatch(action);
  }

  saveRecipe(recipe: Recipe): void {
    let action = new RecipesActions.SaveRecipe(recipe);
    this.store.dispatch(action);
  }

  removeRecipe(recipe: Recipe): void {
    let action = new RecipesActions.RemoveRecipe(recipe);
    this.store.dispatch(action);
  }

}
