import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  DxSelectBoxModule,
  DxDrawerModule,
  DxToolbarModule,
  DxListModule,
} from 'devextreme-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxSelectBoxModule,
    DxDrawerModule,
    DxToolbarModule,
    DxListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
