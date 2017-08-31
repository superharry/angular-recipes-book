import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.reducers";
import { Observable } from "rxjs/Observable";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ShoppingItem } from "../models/shoppingItem";

import * as ShoppingListActions from "./shopping-list.actions";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"]
})
export class ShoppingListComponent implements OnInit {
  shoppingList$: Observable<ShoppingItem[]>;
  closeResult: string = "";

  constructor(
    private modalService: NgbModal,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.shoppingList$ = this.store.select("shoppingList").map(s => s.items);
  }

  open(content, item: ShoppingItem) {
    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `${result}`;
        if (this.closeResult === "confirmed") {
          this.removeItem(item);
        }
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log(this.closeResult);
      }
    );
  }

  addItem(newItem: ShoppingItem) {
    let addItemAction = new ShoppingListActions.AddItem(newItem);
    this.store.dispatch(addItemAction);
  }

  removeItem(itemToRemove: ShoppingItem) {
    let removeItemAction = new ShoppingListActions.RemoveItem(itemToRemove);
    this.store.dispatch(removeItemAction);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}