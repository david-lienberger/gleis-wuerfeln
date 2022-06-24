import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PresentJourneyComponent} from "./component/present-journey/present-journey.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";

const routes: Routes = [
  { path: 'present-journey', component: PresentJourneyComponent },
  { path: '', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
