import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';

import {UserService} from './services/user.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthGuard} from './services/auth-guard.service';
import { TimeframeComponent } from './dashboard/timeframe/timeframe.component';
import {HttpClientModule} from '@angular/common/http';
import {ConnectionService} from './services/connection.service';
import {KeysPipe} from './shared/keys-pipe';
import { AgreegateComponent } from './dashboard/agreegate/agreegate.component';

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    TimeframeComponent,
    KeysPipe,
    AgreegateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [UserService, AuthGuard, ConnectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
