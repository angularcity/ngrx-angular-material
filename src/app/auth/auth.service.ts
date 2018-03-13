import { AuthData } from './auth-data.model';
import { User } from "./user.model";
import { Subject } from 'rxjs/Subject';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material';
import { UIService } from '../shared/ui.service';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as fromRoot from '../store/app.reducer';
import * as UIActions from '../shared/ui.actions';
import * as AuthActions from './auth.actions';



@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiSvc: UIService,
    private store: Store<fromRoot.State> ,
    private snackbar: MatSnackBar ){

  }

  initAuthListener(){
    this.afAuth.authState.subscribe(
      user => {
        //either null/authenticted
        if(user){
          this.store.dispatch(new AuthActions.SetAuthenticated())
          this.router.navigate(['/training']);
        }else{
          this.trainingService.cancelAllSubscriptions();
          this.store.dispatch(new AuthActions.SetunAuthenticated())
          this.router.navigate(['/login']);
          ;
        }

      }
    )
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UIActions.StartLoading())
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch(new UIActions.StopLoading())
      })
      .catch(error => {
        this.store.dispatch(new UIActions.StopLoading())
        this.uiSvc.showSnackbar(error,null,3000);
      });


  }

  login(authData: AuthData) {
    this.store.dispatch(new UIActions.StartLoading())
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch(new UIActions.StopLoading())
      })
      .catch(error => {
        this.store.dispatch(new UIActions.StopLoading())
        this.uiSvc.showSnackbar(error,null,3000);
      });
  }


  logout() {
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }

  private authSuccessfully() {

  }
}
