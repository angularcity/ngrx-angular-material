import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: 'signup' , component: SignupComponent },
  { path: 'login' , component: LoginComponent }
]

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    ReactiveFormsModule,
    AngularFireAuthModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports:[]
})
export class AuthModule {

}
