import { Action } from "@ngrx/store";
import { User } from "../../models/user";

export const SIGN_IN = "[Auth] Sign IN";
export const SIGN_UP = "[Auth] Sign UP";
export const SIGN_IN_UP_SUCCESS = "[Auth] Sign IN_UP Success";
export const SET_TOKEN = "[Auth] Set Token";

export const LOG_OUT = "[Auth] Logout";

export const ERROR = "[Auth] ERROR";

export class SignIn implements Action {
  readonly type = SIGN_IN;
  constructor(public user: User) {}
}

export class SignUp implements Action {
  readonly type = SIGN_UP;
  constructor(public user: User) {}
}

export class SignInUpSuccess implements Action {
  readonly type = SIGN_IN_UP_SUCCESS;
  constructor(public user: User) {}
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;
  constructor(public token: string) {}
}


export class LogOut implements Action {
  readonly type = LOG_OUT;
}

export class Error implements Action {
  readonly type = ERROR;
  constructor(public message: string) {}
}

export type Types = SignIn | SignUp | SignInUpSuccess | SetToken | LogOut | Error;