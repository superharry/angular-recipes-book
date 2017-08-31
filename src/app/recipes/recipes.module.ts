import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";

import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipesComponent } from "./recipes.component";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { RecipeCardComponent } from "./recipe-card/recipe-card.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";

import { RecipesService } from "./recipes.service";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipesListComponent,
    RecipeCardComponent,
    RecipeDetailComponent,
    RecipeEditComponent
  ],
  imports: [SharedModule, RecipesRoutingModule],
  providers: [RecipesService]
})
export class RecipesModule {}