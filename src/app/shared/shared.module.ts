import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "../core/auth/auth-interceptor.service";

import { DataService } from "./data.service";

import { DataEffects } from "./data.effects";
import { NewShoppingItemComponent } from "../shopping-list/new-shopping-item/new-shopping-item.component";

import { AuthGuard } from "../core/auth/auth-guard.service";

@NgModule({
  declarations: [NewShoppingItemComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    StoreModule,
    EffectsModule.forFeature([DataEffects])
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    StoreModule,
    NewShoppingItemComponent
  ],
  providers: [
    AuthGuard,
    DataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class SharedModule {}