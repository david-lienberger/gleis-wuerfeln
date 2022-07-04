import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import {PresentJourneyComponent} from './component/present-journey/present-journey.component';
import {RoadmapComponent} from './component/roadmap/roadmap.component';
import {FutureJourneyComponent} from './component/future-journey/future-journey.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {SafePipe} from './pipe/safe.pipe';
import {MatTooltipModule} from "@angular/material/tooltip";
import {InformationsComponent} from './component/informations/informations.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    PresentJourneyComponent,
    RoadmapComponent,
    FutureJourneyComponent,
    SafePipe,
    InformationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatAutocompleteModule,
    MatTooltipModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
