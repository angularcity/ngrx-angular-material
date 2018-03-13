import { Observable } from 'rxjs/Observable';
import { Excercise } from './../excercise.model';
import { NgForm } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import  { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { UIService } from '../../shared/ui.service';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/app.reducer';
import * as fromTraining from '../../training/training.reducer';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit , OnDestroy{
  excercises$: Observable<Excercise[]>;
  sub: Subscription;
  isLoading$: Observable<boolean>;

  private loadingSub: Subscription;

  constructor(private trainingService: TrainingService,
              private db: AngularFirestore,
              private store: Store<fromTraining.State>,
              private uiSvc: UIService ) { }

  fetchExcercises(){
    this.trainingService.getExcercises();
  }

  ngOnInit() {
   this.isLoading$ = this.store.select(fromRoot.getIsLoading);
   this.excercises$ = this.store.select(fromTraining.getAvailableExcercises);
   this.fetchExcercises();
  }
  onStartTraining(form: NgForm){
    this.trainingService.startExcercise(form.value.excercise)
  }

  ngOnDestroy(): void {
    //this.sub.unsubscribe();
    //this.loadingSub.unsubscribe();
  }
}
