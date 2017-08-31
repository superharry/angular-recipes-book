import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { CoreModule } from "./core/core.module";
import { RecipesModule } from "./recipes/recipes.module";
import { ShoppingListModule } from "./shopping-list/shopping-list.module";

import { appReducers } from "./app.reducers";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    CoreModule,
    RecipesModule,
    ShoppingListModule,

    NgbModule.forRoot(),
    EffectsModule.forRoot([]),
    AppRoutingModule,
    StoreModule.forRoot(appReducers)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}