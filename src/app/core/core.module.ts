import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { Actions, EffectsModule } from "@ngrx/effects";

import { HeaderComponent } from "./header/header.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { CoreRoutingModule } from "./core-routing.module";

import { AuthService } from "./auth/auth.service";
import { AuthEffects } from "./auth/auth.effects";

@NgModule({
  declarations: [HeaderComponent, SignupComponent, SigninComponent],
  imports: [
    SharedModule,
    EffectsModule.forFeature([AuthEffects]),
    CoreRoutingModule
  ],
  providers: [AuthService, Actions],
  exports: [HeaderComponent]
})
export class CoreModule {}