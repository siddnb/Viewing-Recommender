import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterComponent } from './filter/filter.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:'home', component: FilterComponent},
  {path: 'results', component: ResultsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
