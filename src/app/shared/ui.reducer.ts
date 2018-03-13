
import { Action } from "@ngrx/store";
import  * as UIAction from './ui.actions';

export interface State {
  isLoading:boolean;
}

const initialState : State = {
  isLoading: false
}

export function uiReducer(state = initialState, action: UIAction.UIAction){
  switch(action.type){
    case UIAction.START_LOADING:
    return {
      isLoading: true
    }
    case UIAction.STOP_LOADING:
    return {
      isLoading: false
    }
    default:
    return state;
  }
}

//selectors
export const getIsLoading = (state: State) => state.isLoading;
