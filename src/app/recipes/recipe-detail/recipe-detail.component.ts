import { Component, OnInit, OnDestroy } from "@angular/core";

import { ActivatedRoute, ParamMap, Router } from "@angular/router";

import { Recipe } from "../../models/recipe";
import { Subscription } from "rxjs/Subscription";

import "rxjs/add/operator/switchMap";

import { RecipesService } from "../recipes.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"]
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  subscription: Subscription;
  closeResult: string;

  constructor(
    private route: ActivatedRoute,
    private service: RecipesService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.route.paramMap
      .switchMap((params: ParamMap) => {
        let id: number = +params.get("id");
        return this.service.getRecipe(id);
      })
      .subscribe(recipe => (this.recipe = recipe));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  open(content) {
    this.modalService.open(content).result.then(result => {
      this.closeResult = `${result}`;
      if (this.closeResult === "confirmed") {
        this.service.removeRecipe(this.recipe);
        this.router.navigate(["recipes"]);
      }
    });
  }

  onShop() {
    this.service.shopRecipe(this.recipe);
    this.router.navigate(["shopping"]);
  }
}