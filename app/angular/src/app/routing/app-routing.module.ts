import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from '../components/index/index.component';
import { SignupComponent } from '../components/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: []
  },
  {
    path: 'signup',
    component: SignupComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
