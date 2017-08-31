import { Ingredient } from "./ingredient";

export class ShoppingItem {
  constructor(public ingredient: Ingredient, public amount: number) {}
}