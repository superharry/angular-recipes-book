import { ActionReducerMap } from "@ngrx/store";
import * as fromAuth from "./core/auth/auth.reducers";
import * as fromRecipes from "./recipes/recipes.reducers";
import * as fromShoppingList from "./shopping-list/shopping-list.reducers";

export interface AppState {
  auth: fromAuth.AuthState,
	recipes: fromRecipes.RecipesState,
	shoppingList: fromShoppingList.ShoppingListState
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducers,
	recipes: fromRecipes.recipesReducers,
	shoppingList: fromShoppingList.shoppingListReducers
};