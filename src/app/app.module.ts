
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RoundProgressModule} from 'angular-svg-round-progressbar';

import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { TrPipe } from './truncate.pipe';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatAutocompleteModule, MatInputModule, MatFormFieldModule, MatTooltipModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    TrPipe
  ],
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    RoundProgressModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule, 
    MatAutocompleteModule,
    MatTooltipModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAmMccdgisaX-0BuAlilryVb5WNIn2bBkQ'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
