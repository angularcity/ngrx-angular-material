import { Action } from "@ngrx/store";

export const SET_AUTHENTICATED = '[Auth] SET_AUTHENTICATED';
export const SET_UNAUTHENTICATED = '[Auth] SET_UNAUTHENTICATED';

export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTICATED;
}

export class SetunAuthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

export type AuthAction = SetAuthenticated | SetunAuthenticated;
