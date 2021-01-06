import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserYogaFlowComponent } from './components/user-yoga-flow/user-yoga-flow.component';

const routes: Routes = [
  {
    path: '',
    component: UserYogaFlowComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserYogaFlowRoutingModule {
}
