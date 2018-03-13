import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UIService } from '../../shared/ui.service';
import { Subscription } from 'rxjs/Subscription';


import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../store/app.reducer';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  private loadSubs: Subscription;

  constructor(private authService: AuthService,
    private router: Router,
    private store: Store<{ ui: fromApp.State }>,
    private uiService: UIService) { }

  ngOnInit() {

    this.isLoading$ = this.store.select(fromRoot.getIsLoading)


    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required ]})
    })
  }

  ngOnDestroy(): void {
    //this.loadSubs.unsubscribe();
  }

  onSubmit(){
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    })
  }

}
