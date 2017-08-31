import { Action } from '@ngrx/store';
import { ShoppingItem } from '../models/shoppingItem';
import { Recipe } from '../models/recipe';

export const ADD_ITEM = '[Shopping] Add Item';
export const REMOVE_ITEM = '[Shopping] Remove Item';
export const ADD_RECIPE = '[Shopping] Add Recipe';
export const REMOVE_RECIPE = '[Shopping] Remove Recipe';
export const SET_ITEMS = '[Shopping] Set Items';

export class AddItem implements Action {
  readonly type = ADD_ITEM;
  constructor(public payload: ShoppingItem) {}
}

export class RemoveItem implements Action {
  readonly type = REMOVE_ITEM;
  constructor(public payload: ShoppingItem) {}
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;
  constructor(public payload: Recipe) {}
}

export class RemoveRecipe implements Action {
  readonly type = REMOVE_RECIPE;
  constructor(public payload: Recipe) {}
}

export class SetItems implements Action {
  readonly type = SET_ITEMS;
  constructor(public payload: ShoppingItem[]) {}
}

export type Types = AddItem | RemoveItem | AddRecipe | RemoveRecipe | SetItems;