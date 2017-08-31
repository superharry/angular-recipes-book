import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormControl,
  AbstractControl,
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  FormArray
} from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Observable } from "rxjs";

import "rxjs/add/operator/switchMap";

import { Recipe } from "../../models/recipe";
import { Ingredient } from "../../models/ingredient";
import { ShoppingItem } from "../../models/shoppingItem";
import { Subscription } from "rxjs/Subscription";

import { RecipesService } from "../recipes.service";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"]
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  editedRecipe: Recipe;
  subscription: Subscription;

  constructor(
    public route: ActivatedRoute,
    private service: RecipesService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.subscription = this.route.paramMap
      .switchMap(
        (params: ParamMap) =>
          params.get("id") === "new"
            ? this.service.getBlankRecipe()
            : this.service.getRecipe(+params.get("id"))
      )
      .subscribe(
        recipe =>
          (this.editedRecipe = {
            ...recipe,
            shoppingItems: recipe.shoppingItems ? [...recipe.shoppingItems] : []
          })
      ); // immutability; important

    this.recipeForm = this.fb.group({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      imageURL: new FormControl(null, [Validators.required, this.urlValidator]),
      steps: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150)
      ]),
      ingredients: this.fb.array([])
    });

    this.initForm();
  }

  get name(): AbstractControl {
    return this.recipeForm.get("name") as AbstractControl;
  }

  get imageURL(): AbstractControl {
    return this.recipeForm.get("imageURL") as AbstractControl;
  }

  get steps(): AbstractControl {
    return this.recipeForm.get("steps") as AbstractControl;
  }

  get ingredients(): FormArray {
    return this.recipeForm.get("ingredients") as FormArray;
  }

  private initForm(): void {
    this.recipeForm.reset();

    this.name.setValue(this.editedRecipe.name);
    this.imageURL.setValue(this.editedRecipe.imageURL);
    this.steps.setValue(this.editedRecipe.steps);

    const ingredientsFG = this.editedRecipe.shoppingItems.map(item =>
      this.itemFG(item)
    );
    this.recipeForm.setControl("ingredients", this.fb.array(ingredientsFG));
  }

  onReset(): void {
    this.initForm();
  }

  addItem(newItem: ShoppingItem) {
    for (let control of this.ingredients.controls) {
      if (
        (control.get("ingredientName").value as string).toLowerCase() ===
        newItem.ingredient.name.toLowerCase()
      ) {
        control
          .get("amount")
          .setValue(newItem.amount + control.get("amount").value);
        return;
      }
    }
    this.ingredients.push(this.itemFG(newItem));
  }

  private itemFG(item: ShoppingItem): FormGroup {
    return this.fb.group({
      ingredientName: new FormControl(item.ingredient.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      amount: new FormControl(item.amount, [
        Validators.required,
        Validators.min(1),
        Validators.max(50)
      ])
    });
  }

  onRemove(formGroupName: number) {
    this.ingredients.removeAt(formGroupName);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  urlValidator = (control: AbstractControl): { [key: string]: any } => {
    let urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    const isURL = urlRegex.test(control.value);
    return isURL ? null : { urlValidator: { value: control.value } };
  };

  onSaveRecipe() {
    if (this.recipeForm.valid) {
      let recipeToSave: Recipe = this.recipeForm.value as Recipe;
      recipeToSave.id = this.editedRecipe.id;
      recipeToSave.shoppingItems = this.recipeForm.value.ingredients.map(
        ing => new ShoppingItem(new Ingredient(ing.ingredientName), ing.amount)
      );
      this.service.saveRecipe(recipeToSave);
    }
    this.router.navigate(["recipes"]);
  }

  onCancel() {
    this.router.navigate(["recipes"]);
  }
}