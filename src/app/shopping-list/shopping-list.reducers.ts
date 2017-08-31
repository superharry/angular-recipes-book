import { ShoppingItem } from "../models/shoppingItem";
import { Ingredient } from "../models/ingredient";

import * as ShoppingListActions from "./shopping-list.actions";

export interface ShoppingListState {
  items: ShoppingItem[];
}

const initialState = {
  items: []
};

export function shoppingListReducers(
  state: ShoppingListState = initialState,
  action: ShoppingListActions.Types
) {
  switch (action.type) {
    case ShoppingListActions.ADD_ITEM: {
      let newItems: ShoppingItem[] = [...state.items];

      let targetItem: ShoppingItem = newItems.find(
        i =>
          i.ingredient.name.toLowerCase() ===
          action.payload.ingredient.name.toLowerCase()
      );

      if (targetItem) {
        targetItem.amount += action.payload.amount;
      } else {
        newItems.push(action.payload);
      }

      return {
        ...state,
        items: newItems
      };
    }
    case ShoppingListActions.REMOVE_ITEM: {
      let newItems: ShoppingItem[] = [...state.items];

      let targetItem: ShoppingItem = newItems.find(
        i =>
          i.ingredient.name.toLowerCase() ===
          action.payload.ingredient.name.toLowerCase()
      );

      if (targetItem) {
        targetItem.amount -= action.payload.amount;
        if (targetItem.amount <= 0) {
          newItems = newItems.filter(
            i =>
              i.ingredient.name.toLowerCase() !==
              action.payload.ingredient.name.toLowerCase()
          );
        }
      }

      return {
        ...state,
        items: newItems
      };
    }
    case ShoppingListActions.ADD_RECIPE: {
      let newItems: ShoppingItem[] = [...state.items];

      action.payload.shoppingItems.forEach(newItem => {
        let targetItem: ShoppingItem = newItems.find(
          i =>
            i.ingredient.name.toLowerCase() ===
            newItem.ingredient.name.toLowerCase()
        );

        if (targetItem) {
          targetItem.amount += newItem.amount;
        } else {
          newItems.push(Object.assign({}, newItem));
        }
      });

      return {
        ...state,
        items: newItems
      };
    }
    case ShoppingListActions.SET_ITEMS: {
      return {
        ...state,
        items: [...action.payload]
      }
    }
    default:
      return state;
  }
}