import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { YogaFlowService } from '../../../../core/yoga-flow.service';
import { YogaFlowPose } from '../../../../shared/models/yoga-flow-pose';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-yoga-flow',
  templateUrl: './user-yoga-flow.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserYogaFlowComponent implements OnInit, OnDestroy {
  public yogaFlow: YogaFlowPose[];
  private flowSubs: Subscription;

  constructor(private yogaFlowService: YogaFlowService) { }

  public ngOnInit(): void {
    this.flowSubs = this.yogaFlowService.yogaFlow$.subscribe(flow => {
      this.yogaFlow = flow;
    });
  }

  public ngOnDestroy(): void {
    this.flowSubs.unsubscribe();
  }
}
