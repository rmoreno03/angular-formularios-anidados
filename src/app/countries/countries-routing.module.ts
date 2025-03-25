import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';

const routes: Routes = [
  { path: 'selector', component: SelectorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule { }
