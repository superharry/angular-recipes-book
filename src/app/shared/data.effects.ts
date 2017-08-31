import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../app.reducers";
import { RecipesState } from "../recipes/recipes.reducers";
import { ShoppingListState } from "../shopping-list/shopping-list.reducers";

import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/withLatestFrom";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/map";

import * as DataActions from "./data.actions";
import * as RecipesActions from "../recipes/recipes.actions";
import * as ShoppingListActions from "../shopping-list/shopping-list.actions";

const URL: string = "https://angular-recipes-book.firebaseio.com/data.json";

@Injectable()
export class DataEffects {
  @Effect()
  saveDataEffect = this.actions$
    .ofType(DataActions.SAVE_DATA)
    .withLatestFrom(
      this.store.select("recipes"),
      this.store.select("shoppingList")
    )
    .switchMap(([action, recipesState, shoppingListState]) =>
      this.http.put(URL, {
        recipes: recipesState,
        shoppingList: shoppingListState
      })
    )
    .map(response => {
      return new DataActions.SaveDataSuccess();
    });

  @Effect({ dispatch: false })
  saveDataSuccessEffect = this.actions$
    .ofType(DataActions.SAVE_DATA_SUCCESS)
    .do(() => console.log("Data saved successfully."));

  @Effect()
  loadDataEffect = this.actions$
    .ofType(DataActions.LOAD_DATA)
    .switchMap(action =>
      this.http.get<{ recipes: RecipesState; shoppingList: ShoppingListState }>(
        URL
      )
    )
    .map(response => {
      console.log("Data loaded successfully");
      return new DataActions.LoadDataSuccess({
        recipes: response.recipes as RecipesState,
        shoppingList: response.shoppingList as ShoppingListState
      });
    });

  @Effect()
  loadDataSuccessEffect = this.actions$
    .ofType(DataActions.LOAD_DATA_SUCCESS)
    .mergeMap((action: DataActions.LoadDataSuccess) => [
      new RecipesActions.SetRecipeState(
        action.payload.recipes.nextIndex,
        action.payload.recipes.recipes
      ),
      new ShoppingListActions.SetItems(action.payload.shoppingList.items)
    ]);

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}
}