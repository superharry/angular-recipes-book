import * as AuthActions from "./auth.actions";

export interface AuthState {
  token: string;
  username: string;
  authenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  username: null,
  authenticated: false
};

export function authReducers(state: AuthState = initialState, action: AuthActions.Types) {
  switch (action.type) {
    case AuthActions.SIGN_IN_UP_SUCCESS: {
      console.log(action.user.username + " log in success");
      state.username = action.user.username;
      return state;
    }
    case AuthActions.SET_TOKEN: {
      console.log("Setting token to: " + action.token);
      state.token = action.token;
      state.authenticated = true;
      return state;
    }
    case AuthActions.LOG_OUT: {
      console.log(state.username + " logging out");
      state.username = null;
      state.token = null;
      state.authenticated = false;
      return state;
    }
    default:
      return state;
  }
}