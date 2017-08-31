import { ShoppingItem } from "./shoppingItem";

export class Recipe {
  id: number;
  name: string;
  imageURL: string;
  shoppingItems: ShoppingItem[];
  steps: string;
}