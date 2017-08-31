import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../app.reducers";
import { AuthState } from "./auth.reducers";
import * as AuthActions from "./auth.actions";

import * as firebase from "firebase";

import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthService {
  constructor(private store: Store<AppState>) {}

  signupUser(email: string, password: string) {
    const user = { username: email, password: password };
    this.store.dispatch(new AuthActions.SignUp(user));
  }
  signinUser(email: string, password: string) {
    const user = { username: email, password: password };
    this.store.dispatch(new AuthActions.SignIn(user));
  }
  logoutUser() {
    this.store.dispatch(new AuthActions.LogOut());
  }
  getToken(): Observable<string> {
    return this.store.select("auth").map((state: AuthState) => state.token);
  }
  getEmail(): Observable<string> {
    return this.store.select("auth").map((state: AuthState) => state.username);
  }
  isAuthenticated(): Observable<boolean> {
    return this.store
      .select("auth")
      .map((state: AuthState) => state.authenticated);
  }
}
