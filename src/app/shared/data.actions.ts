import { Action } from '@ngrx/store';
import { Recipe } from "../models/recipe";
import { ShoppingItem } from "../models/shoppingItem";
import { RecipesState } from "../recipes/recipes.reducers";
import { ShoppingListState } from "../shopping-list/shopping-list.reducers";

export const SAVE_DATA = '[Data] Save Data';
export const SAVE_DATA_SUCCESS = '[Data] Save Data Success';
export const LOAD_DATA = '[Data] Load Data';
export const LOAD_DATA_SUCCESS = '[Data] Load Data Success';

export class SaveData implements Action {
  readonly type = SAVE_DATA;
}

export class SaveDataSuccess implements Action {
  readonly type = SAVE_DATA_SUCCESS;
}

export class LoadData implements Action {
  readonly type = LOAD_DATA;
}

export class LoadDataSuccess implements Action {
  readonly type = LOAD_DATA_SUCCESS;
  constructor(public payload: {recipes: RecipesState, shoppingList: ShoppingListState}) {}
}

export type Types = SaveData | SaveDataSuccess | LoadData | LoadDataSuccess;