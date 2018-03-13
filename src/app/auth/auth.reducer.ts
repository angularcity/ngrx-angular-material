
import { Action } from "@ngrx/store";
import  * as AuthAction from './auth.actions';

export interface State {
  isAuthenticated:boolean;
}
const initialState : State = {
  isAuthenticated: false
}
export function authReducer(state = initialState, action: AuthAction.AuthAction){
  switch(action.type){
    case AuthAction.SET_AUTHENTICATED:
    return {
      isAuthenticated: true
    }
    case AuthAction.SET_UNAUTHENTICATED:
    return {
      isAuthenticated: false
    }
    default:
    return state;
  }
}
//selectors
export const getIsAuth = (state: State) => state.isAuthenticated;
