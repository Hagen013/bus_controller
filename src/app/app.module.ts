import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';


import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent }  from './app.component';
import { ChartsComponent } from './charts.component';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    ChartsModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    ChartsComponent,
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
