import { NgModule } from '@angular/core';
import { UserYogaFlowComponent } from './components/user-yoga-flow/user-yoga-flow.component';
import { UserYogaFlowRoutingModule } from './user-yoga-flow-routing.module';
import { UserYogaFlowListComponent } from './components/user-yoga-flow/user-yoga-flow-list/user-yoga-flow-list.component';
import { UserYogaFlowElementComponent } from './components/user-yoga-flow/user-yoga-flow-list/user-yoga-flow-element/user-yoga-flow-element.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [UserYogaFlowComponent, UserYogaFlowListComponent, UserYogaFlowElementComponent],
  imports: [
    UserYogaFlowRoutingModule,
    SharedModule
  ],
})
export class UserYogaFlowModule {}
