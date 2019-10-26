import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {title: 'login'}
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: {title: 'profile'}
  },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginComponent, ProfileComponent],
})
export class AuthModule { }
