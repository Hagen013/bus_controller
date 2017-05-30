import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { ChartsModule } from 'ng2-charts';
import { LineChartComponent } from './app.chart.component';


import { HttpModule }    from '@angular/http';

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    ChartsModule
  ],
  declarations: [ AppComponent, LineChartComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }