
import { Subscription } from 'rxjs/Subscription';
import { TrainingService } from './../training.service';
import { Excercise } from './../excercise.model';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource , MatSort, MatPaginator} from '@angular/material';
import * as fromTraining from '../training.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {

  mySub:Subscription;

  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Excercise>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;

  constructor(private trainingSvc: TrainingService,
    private store: Store<fromTraining.State>) { }

  doFilter(filterVal:string){
    this.dataSource.filter =filterVal.trim().toLowerCase();
  }

  ngOnInit() {

    this.store.select(fromTraining.getFinishedExcercises).subscribe(
      ex => {
        this.dataSource.data = ex;
      }
    )
    this.trainingSvc.getCompletedOrCancelledExcercises();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
