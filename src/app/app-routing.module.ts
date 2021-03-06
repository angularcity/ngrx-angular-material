import {Routes , RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { WelcomeComponent } from './welcome/welcome.component';
import { TrainingComponent } from './training/training.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '' , component: WelcomeComponent },
  { path: 'training' , loadChildren: './training/training.module#TrainingModule', canLoad: [AuthGuard] }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule]
})
export class AppRoutingModule {

}
