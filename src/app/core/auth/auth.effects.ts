import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { User } from "../../models/user";
import { Router } from "@angular/router";

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/empty";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/map";

import * as firebase from "firebase";
import * as AuthActions from "./auth.actions";
import * as DataActions from "../../shared/data.actions";

@Injectable()
export class AuthEffects {
  @Effect()
  signUpEffect = this.actions$
    .ofType(AuthActions.SIGN_UP)
    .switchMap((action: AuthActions.SignUp) =>
      Observable.fromPromise(
        firebase
          .auth()
          .createUserWithEmailAndPassword(
            action.user.username,
            action.user.password
          )
          .catch(error => {
            console.error(error);
            return Observable.empty();
          })
      )
    )
    .map(
      response =>
        response.email
          ? new AuthActions.SignInUpSuccess({ username: response.email })
          : new AuthActions.Error("Signup Failed")
    );

  @Effect()
  signInEffect = this.actions$
    .ofType(AuthActions.SIGN_IN)
    .switchMap((action: AuthActions.SignUp) =>
      Observable.fromPromise(
        firebase
          .auth()
          .signInWithEmailAndPassword(
            action.user.username,
            action.user.password
          )
          .catch(error => {
            console.error(error);
            return Observable.empty();
          })
      )
    )
    .map(
      response =>
        response.email
          ? new AuthActions.SignInUpSuccess({ username: response.email })
          : new AuthActions.Error("Signin Failed")
    );

  @Effect()
  signInUpSuccessEffect = this.actions$
    .ofType(AuthActions.SIGN_IN_UP_SUCCESS)
    .switchMap(() =>
      Observable.fromPromise(firebase.auth().currentUser.getIdToken())
    )
    .map((token: string) => {
      return new AuthActions.SetToken(token);
    });

  @Effect()
  setTokenEffect = this.actions$
    .ofType(AuthActions.SET_TOKEN)
    .map(action => {
      this.router.navigate(["recipes"]);
      return new DataActions.LoadData();
    });

  @Effect({ dispatch: false })
  logOutSideEffect = this.actions$.ofType(AuthActions.LOG_OUT).do(() => {
    console.log("Handling firebase logout");
    this.router.navigate(["signin"]);
    firebase.auth().signOut();
  });

  @Effect({ dispatch: false })
  errorEffect = this.actions$
    .ofType(AuthActions.ERROR)
    .do((action: AuthActions.Error) => console.error(action.message));

  constructor(private actions$: Actions, private router: Router) {}
}