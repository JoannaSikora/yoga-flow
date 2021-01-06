import { Component, Input } from '@angular/core';
import { YogaFlowPose } from '../../../../../../shared/models/yoga-flow-pose';
import { YogaFlowService } from '../../../../../../core/yoga-flow.service';
import { OrderAction } from '../../../../../../shared/enums/orderAction';

@Component({
  selector: 'app-user-yoga-flow-element',
  templateUrl: './user-yoga-flow-element.component.html',
  styleUrls: ['./user-yoga-flow-element.component.scss'],
})
export class UserYogaFlowElementComponent {
  @Input() pose: YogaFlowPose;
  public orderAction = OrderAction;

  get lastOrderNumber(): number {
    return this.yogaFlowService.lastOrderNumber;
  }

  constructor(private yogaFlowService: YogaFlowService) { }

  public removePoseFromFlow(): void {
    this.yogaFlowService.removePose(this.pose);
  }

  public movePose(orderAction: OrderAction): void {
    this.yogaFlowService.movePose(this.pose, orderAction);
  }

}
