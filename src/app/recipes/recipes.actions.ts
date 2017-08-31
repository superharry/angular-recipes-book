import { Action } from "@ngrx/store";
import { Recipe } from "../models/recipe";

export const SAVE_RECIPE = "[Recipes] Save Recipe";
export const REMOVE_RECIPE = "[Recipes] Remove Recipe";
export const SET_RECIPE_STATE = "[Recipes] Set Recipe State";

export class SaveRecipe implements Action {
	readonly type = SAVE_RECIPE;
	constructor(public recipe: Recipe) {}
}

export class RemoveRecipe implements Action {
	readonly type = REMOVE_RECIPE;
	constructor(public recipe: Recipe) {}
}

export class SetRecipeState implements Action {
  readonly type = SET_RECIPE_STATE;
  constructor(public nextIndex: number, public recipes: Recipe[]) {}
}

export type Types = SaveRecipe | RemoveRecipe | SetRecipeState;