import { AngularFirestore } from 'angularfire2/firestore';
import { Excercise } from './excercise.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { UIService } from '../shared/ui.service';

import * as UIActions from '../shared/ui.actions';
import * as fromRoot from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as TrainingActions from '../training/training.actions';
import * as fromTraining from '../training/training.reducer';
import { take } from 'rxjs/operators/take';

@Injectable()
export class TrainingService {

  private excercises =[];
  private fbSub: Subscription[] = [];

  // excerciseChanged = new Subject<Excercise> ();
  // excercisesChanged = new Subject<Excercise[]> ();
  // finishedExcercisesChanged = new Subject<Excercise[]> ();

  // availableExcercises: Excercise[] = [];
  // runningExcercise: Excercise;

  startExcercise(selectedId: string){
    this.store.dispatch(new TrainingActions.StartTraining(selectedId))
  }

  constructor(private db: AngularFirestore,
    private store: Store<fromTraining.State>,
    private uiSvc: UIService){

  }

  getExcercises(){
    this.store.dispatch(new UIActions.StartLoading())
    this.fbSub.push(this.db.collection('availableExcercises')
    .snapshotChanges()
    .map( docArr => {
      return docArr.map( doc => {
        return {
          id: doc.payload.doc.id,
          name: doc.payload.doc.data().name,
          duration: doc.payload.doc.data().duration,
          calories: doc.payload.doc.data().calories
        }
      }
    )
    }).subscribe(
      (excercises: Excercise[]) => {
        this.store.dispatch(new UIActions.StopLoading())
        this.store.dispatch(new TrainingActions.SetAvailableTraining(excercises))
      }, error => {
        this.store.dispatch(new UIActions.StopLoading())
        this.uiSvc.showSnackbar('Fetching failed!', null, 3000);
        //this.excerciseChanged.next(null)
      }
    )
   )
  }

  completeExcercise(){
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(
      ex => {
        this.addDataToDataBase({
          ...ex,
          date: new Date(),
          state: 'completed'
         });
         this.store.dispatch(new TrainingActions.StopTraining())
      }
    )
  }

  cancelExcercise(progress: number){
    this.store.select(fromTraining.getActiveTraining)
    .pipe(take(1))
    .subscribe(
      ex => {
        this.addDataToDataBase({
          ...ex,
          duration: ex.duration * (progress /100),
          calories: ex.calories * (progress /100),
          date: new Date(),
          state: 'cancelled'
         });
         this.store.dispatch(new TrainingActions.StopTraining())
      }
    )
  }

  getRunningExcercise(){
    //return { ...this.runningExcercise }
  }

  getCompletedOrCancelledExcercises(){
    this.fbSub.push(this.db.collection('finishedExercises').valueChanges()
    .subscribe(
      (excercises: Excercise[]) => {
        this.store.dispatch(new TrainingActions.SetFinishedTraining(excercises))
      }
    ))
  }

  cancelAllSubscriptions(){
    this.fbSub.forEach(sub => sub.unsubscribe());
  }

  //for complete & cancel, we need to save them as & when its done.
  private addDataToDataBase(excercise: Excercise){
    this.db.collection('finishedExercises').add(excercise).then(
      result => console.log(result)
    )
  }
}
