import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingListService } from "./shopping-list.service";

@NgModule({
  declarations: [ShoppingListComponent],
  imports: [SharedModule, ShoppingListRoutingModule],
  providers: [ShoppingListService]
})
export class ShoppingListModule {}