import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/app.reducer';


@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit,OnDestroy {

  isAuth$: Observable<boolean>;
  sub:Subscription

  @Output() closeSideNav = new EventEmitter<void>();

  constructor(private authService: AuthService, private store: Store<fromRoot.State> ) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth)
  }

  onClose(){
    this.closeSideNav.emit()
    this.authService.logout();
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
