import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { YogaFlowPose } from '../../../../../shared/models/yoga-flow-pose';

@Component({
  selector: 'app-user-yoga-flow-list',
  templateUrl: './user-yoga-flow-list.component.html',
  styleUrls: ['./user-yoga-flow-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserYogaFlowListComponent {
  @Input() yogaFlow: YogaFlowPose[];
}
