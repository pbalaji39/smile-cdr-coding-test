import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DynamicFormComponent } from './components/questionnaire/dynamic-form.component';

const routes: Routes = [
  {
    path: 'questionnaire',
    component: DynamicFormComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: ':given',
    component: HomeComponent,
  },
  {
    path: ':family',
    component: HomeComponent,
  },
  {
    path: ':given&:family',
    component: HomeComponent,
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
