
import { Excercise } from './excercise.model';
import { Action } from '@ngrx/store';

export const SET_AVL_TRAINING = '[Training] SET_AVL_TRAINING';
export const SET_FIN_TRAINING = '[Training] SET_FIN_TRAINING';
export const START_TRAINING = '[Training] START_TRAINING';
export const STOP_TRAINING = '[Training] STOP_TRAINING';

export class SetAvailableTraining implements Action {
  readonly type = SET_AVL_TRAINING;
  constructor(public payload: Excercise[]){
  }
}

export class SetFinishedTraining implements Action {
  readonly type = SET_FIN_TRAINING;
  constructor(public payload: Excercise[]){
  }
}

export class StartTraining implements Action {
  readonly type = START_TRAINING;
  constructor(public payload: string){
  }
}

export class StopTraining implements Action {
  readonly type = STOP_TRAINING;
}

export type TrainingActions =
  | SetAvailableTraining
  | SetFinishedTraining
  | StartTraining
  | StopTraining;
