import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RecipesComponent } from "./recipes.component";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";

import { AuthGuard } from "../core/auth/auth-guard.service";

const routes: Routes = [
  {
    path: "recipes",
    component: RecipesListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "recipe/:id/edit",
    component: RecipeEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "recipe/:id",
    component: RecipeDetailComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}