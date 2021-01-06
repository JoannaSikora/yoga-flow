import { NgModule } from '@angular/core';
import { YogaPosesListComponent } from './components/yoga-poses-list/yoga-poses-list.component';
import { YogaPosesRoutingModule } from './yoga-poses-routing.module';
import { YogaPoseComponent } from './components/yoga-poses-list/yoga-pose/yoga-pose.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [YogaPosesListComponent, YogaPoseComponent],
    imports: [
        YogaPosesRoutingModule,
        SharedModule
    ],
})
export class YogaPosesModule {}
