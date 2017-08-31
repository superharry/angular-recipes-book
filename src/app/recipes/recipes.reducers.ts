import { Recipe } from "../models/recipe";
import { Ingredient } from "../models/ingredient";

import * as RecipesActions from "./recipes.actions";

export interface RecipesState {
  recipes: Recipe[];
  nextIndex: number;
}

const initialState: RecipesState = {
  nextIndex: 1,
  recipes: []
};

export function recipesReducers (state: RecipesState = initialState, action: RecipesActions.Types) {
  switch(action.type) {
    case RecipesActions.SAVE_RECIPE: {
      let newRecipes = [...state.recipes];
      let newIndex = state.nextIndex;
      if(action.recipe.id >= 0) {
        console.log("recipe update");
        newRecipes = newRecipes.map(r => r.id === action.recipe.id? action.recipe : r);
      } else {
        console.log("recipe add");
        action.recipe.id = newIndex;
        newRecipes.push(action.recipe);
        newIndex += 1;
      }
      return {
        nextIndex: newIndex,
        recipes: newRecipes
      };
    }
    case RecipesActions.REMOVE_RECIPE: {
      return {
        nextIndex: state.nextIndex,
        recipes: state.recipes.filter(r => r.id !== action.recipe.id)
      };
    }
    case RecipesActions.SET_RECIPE_STATE: {
      return {
        nextIndex: action.nextIndex,
        recipes: [...action.recipes]
      };
    }
    default:
      return state;
  }
}