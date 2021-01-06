import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { YogaPose } from '../../../../../shared/models/yoga-pose';
import { YogaFlowService } from '../../../../../core/yoga-flow.service';

@Component({
  selector: 'app-yoga-pose',
  templateUrl: './yoga-pose.component.html',
  styleUrls: ['./yoga-pose.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YogaPoseComponent {
  @Input() public pose: YogaPose;

  get yogaFlowPoseCount(): number {
    return this.yogaFlowService.getPoseCountInFlow(this.pose);
  }

  get isAddedToFlow(): boolean {
    return this.yogaFlowService.getIsPoseAddedToFlow(this.pose);
  }

  constructor(private yogaFlowService: YogaFlowService) {
  }

  public addToFlow(): void {
      this.yogaFlowService.addPose(this.pose);
  }

}
