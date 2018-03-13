import { Action , createFeatureSelector, createSelector } from "@ngrx/store";
import  * as TrainingActions from './training.actions';
import { Excercise } from "./excercise.model";
import * as fromRoot from '../store/app.reducer';

export interface TrainingState  {
  availableExcercises: Excercise[],
  finishedExcercises: Excercise[],
  activeTraining: Excercise
}

export interface State extends fromRoot.State {
   training: TrainingState
}

const initialState : TrainingState = {
  availableExcercises: [],
  finishedExcercises: [],
  activeTraining: null
}

export function trainingReducer(state = initialState, action: TrainingActions.TrainingActions){
  switch(action.type){
    case TrainingActions.SET_AVL_TRAINING:
    return {
      ...state,
      availableExcercises: action.payload
    }

    case TrainingActions.SET_FIN_TRAINING:
    return {
      ...state,
      finishedExcercises: action.payload
    }

    case TrainingActions.START_TRAINING:
    return {
      ...state,
      activeTraining: {...state.availableExcercises.find( ex => ex.id === action.payload)}
    }

    case TrainingActions.STOP_TRAINING:
    return {
      ...state,
      activeTraining: null
    }

    default:
    return state;
  }
}

// gives access to entire training slice.
export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExcercises =
    createSelector(getTrainingState, ( state: TrainingState) => state.availableExcercises)

export const getFinishedExcercises =
    createSelector(getTrainingState, ( state: TrainingState) => state.finishedExcercises)

export const getActiveTraining =
    createSelector(getTrainingState, ( state: TrainingState) => state.activeTraining)

export const getIsTraining =
createSelector(getTrainingState, ( state: TrainingState) => state.activeTraining != null)

