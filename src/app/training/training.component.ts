import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';
import { TrainingService } from './training.service';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training/training.reducer';
import { Observable } from 'rxjs/Observable';





@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  onGoingTraining$ : Observable<boolean>;
  excerciseEubscription : Subscription;

  constructor(private trainingService: TrainingService,
    private store: Store<fromTraining.State> ) { }


  ngOnInit() {
    this.onGoingTraining$ = this.store.select(fromTraining.getIsTraining);
  }
}
