import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { YogaPosesListComponent } from './components/yoga-poses-list/yoga-poses-list.component';

const routes: Routes = [
  {
    path: '',
    component: YogaPosesListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YogaPosesRoutingModule {
}
