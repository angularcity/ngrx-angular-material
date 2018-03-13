import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth$: Observable<boolean>;
  sub:Subscription;

  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private authService: AuthService, private store: Store<fromRoot.State>,) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth)
  }

  onToggleSideNav(){
    this.sidenavToggle.emit();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  logout(){
    this.authService.logout();
  }
}
