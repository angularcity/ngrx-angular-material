import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,
         RouterStateSnapshot,
         CanLoad,
         Route} from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AuthService } from './auth.service';


import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/app.reducer';
import { take } from 'rxjs/operators/take';


@Injectable()
export class AuthGuard implements CanActivate,CanLoad {

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1))
  }
  constructor(private store: Store<fromRoot.State>, private router: Router){

  }
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
      return this.store.select(fromRoot.getIsAuth).pipe(take(1))
  }
}


