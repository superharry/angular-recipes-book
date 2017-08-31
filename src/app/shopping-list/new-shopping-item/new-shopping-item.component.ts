import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { Observable } from "rxjs";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/of";

import { Ingredient } from "../../models/ingredient";
import { ShoppingItem } from "../../models/shoppingItem";

import { ShoppingListService } from "../shopping-list.service";

@Component({
  selector: "app-new-shopping-item",
  templateUrl: "./new-shopping-item.component.html",
  styleUrls: ["./new-shopping-item.component.css"]
})
export class NewShoppingItemComponent implements OnInit {
  itemToEmit: ShoppingItem;
  form: FormGroup;

  @Output() onAdded = new EventEmitter<ShoppingItem>();

  constructor(private slService: ShoppingListService) {}

  ngOnInit() {
    this.itemToEmit = new ShoppingItem(null, null);
    this.form = new FormGroup({
      ingredientName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      amount: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(50)
      ])
    });
  }

  get ingredientName(): any {
    return this.form.get("ingredientName");
  }

  get amount(): any {
    return this.form.get("amount");
  }

  suggestIngredients = (text$: Observable<string>): Observable<string[]> =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .switchMap(term =>
        this.slService
          .getKnownIngredients()
          .map(array =>
            array.filter(
              ki => ki.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
          )
      );

  onAdd() {
    if (this.form.valid) {
      this.itemToEmit.ingredient = new Ingredient(
        this.form.get("ingredientName").value
      );
      this.itemToEmit.amount = this.form.get("amount").value;
      this.onAdded.emit(this.itemToEmit);
      this.form.reset();
    }
  }
}