import { Injectable } from "@angular/core";
import { Recipe } from "../models/recipe";
import { Ingredient } from "../models/ingredient";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/map";
import "rxjs/add/operator/scan";

import { Store } from "@ngrx/store";
import { AppState } from "../app.reducers";

import * as _ from "lodash";

@Injectable()
export class ShoppingListService {
  constructor(private store: Store<AppState>) {}

  getKnownIngredients(): Observable<string[]> {
    return this.store
      .select("recipes")
      .flatMap(recipesState => recipesState.recipes)
      .scan((results: string[], recipe: Recipe) => {
        let newNames: string[] = [];
        if(recipe.shoppingItems) {
          newNames = recipe.shoppingItems.map(item => item.ingredient.name);
        }
        return _.union(results, newNames);
      }, []);
  }
}