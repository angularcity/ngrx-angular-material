import { Component, OnInit , EventEmitter, Output} from '@angular/core';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import { take } from 'rxjs/operators/take';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  timer: number;
  @Output() trainingExit = new EventEmitter<void>();

  constructor(private dialog: MatDialog,
    private store: Store<fromTraining.State>,
     private trainingSvc: TrainingService) { }

  ngOnInit() {
   this.startOrResumeTimer();
  }

  startOrResumeTimer(){
    this.store.select(fromTraining.getActiveTraining)
    .pipe(take(1))
    .subscribe(
      ex => {
        const step = ex.duration / 100 * 1000;
        this.timer =  setInterval( ()=> {
          this.progress = this.progress + 1;
          if(this.progress >= 100){
            this.trainingSvc.completeExcercise();
            clearInterval(this.timer);
          }
        }, step)
      }
    )
  }

  onStopTraining(){
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
        data: {
          progress: this.progress
        }
    })

    dialogRef.afterClosed().subscribe(
      result => {
        if(result){
          this.trainingSvc.cancelExcercise(this.progress);
        }else{
          this.startOrResumeTimer();
        }
      }
    )
  }
}
