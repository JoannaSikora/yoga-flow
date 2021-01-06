import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { YogaFlowPose } from '../shared/models/yoga-flow-pose';
import { PoseLevel } from '../shared/enums/poseLevel';
import { PoseBodyParts } from '../shared/enums/poseBodyParts';
import { YogaPose } from '../shared/models/yoga-pose';
import { OrderAction } from '../shared/enums/orderAction';

const initialYogaFlow = [
  {
    yogaFlowPoseId: 1,
    id:  1,
    englishName:  'Bridge',
    sanskritName: 'Setu Bandha Sarvangasana',
    level:  PoseLevel.Beginner,
    bodyParts: [PoseBodyParts.Arms, PoseBodyParts.Back],
    icon:  'assets/icons/poses/bridge.svg',
    order: 1,
  },
  {
    yogaFlowPoseId: 2,
    id:  2,
    englishName:  'Cat',
    sanskritName: 'Marjaryasana',
    level:  PoseLevel.Beginner,
    bodyParts: [PoseBodyParts.Back],
    icon:  'assets/icons/poses/cat.svg',
    order: 2,
  },
  {
    yogaFlowPoseId: 3,
    id:  3,
    englishName:  'Chair',
    sanskritName: 'Utkatasana',
    level:  PoseLevel.Beginner,
    bodyParts: [PoseBodyParts.Back, PoseBodyParts.Legs],
    icon:  'assets/icons/poses/chair.svg',
    order: 3
  }
];

@Injectable({
  providedIn: 'root'
})
export class YogaFlowService {
  private _yogaFlow: BehaviorSubject<YogaFlowPose[]> = new BehaviorSubject<YogaFlowPose[]>(initialYogaFlow);

  get yogaFlow$(): Observable<YogaFlowPose[]> {
    return this._yogaFlow.asObservable();
  }

  get yogaFlow(): YogaFlowPose[] {
    return this._yogaFlow.getValue();
  }

  private sortByOrder(a: YogaFlowPose, b: YogaFlowPose): number {
    return Number(a.order) - Number(b.order);
  }

  get nextOrderNumber(): number {
    if (this.yogaFlow.length === 0) {
      return 1;
    }

    return Math.max(...this.yogaFlow.map(yogaPose => yogaPose.order)) + 1;
  }

  public getIsPoseAddedToFlow(pose: YogaPose): boolean {
    return !!this.yogaFlow.find(yogaPose => yogaPose.id === pose.id);
  }

  public getPoseCountInFlow(pose: YogaPose): number {
    return this.yogaFlow.filter(yogaPose => yogaPose.id === pose.id).length;
  }

  get lastOrderNumber(): number {
    return Math.max(...this.yogaFlow.map(yogaPose => yogaPose.order));
  }

  get yogaFlowPoseId(): number {
    if (this.yogaFlow.length === 0) {
      return 1;
    }

    return Math.max(...this.yogaFlow.map(yogaPose => yogaPose.yogaFlowPoseId)) + 1;
  }

  public addPose(pose: YogaPose): void {
    this._yogaFlow.next([...this.yogaFlow, {...pose, order: this.nextOrderNumber, yogaFlowPoseId: this.yogaFlowPoseId}]);
  }

  public removePose(pose: YogaFlowPose): void {
    const poseToRemove = this.yogaFlow.find(yogaPose => yogaPose.yogaFlowPoseId === pose.yogaFlowPoseId);
    const posesWithLowerOrder = this.yogaFlow.filter(yogaPose => yogaPose.order < poseToRemove.order);
    const posesWithDecreasedOrder = this.yogaFlow
      .filter(yogaPose => yogaPose.order > poseToRemove.order)
      .map(yogaPose => {
        return {...yogaPose, order: yogaPose.order - 1};
      });

    this._yogaFlow.next([...posesWithLowerOrder, ...posesWithDecreasedOrder]);
  }

  public movePose(pose: YogaFlowPose, action: OrderAction): void {
    const yogaFlow = this.yogaFlow;

    if (action === OrderAction.Up) {
      if (pose.order === 1) {
        return;
      }

      const poseToSwap = yogaFlow.find(yogaPose => yogaPose.order + 1 === pose.order);
      poseToSwap.order = poseToSwap.order + 1;
      pose.order = pose.order - 1;

  } else if (action === OrderAction.Down) {
      if (pose.order === this.lastOrderNumber) {
        return;
      }

      const poseToSwap = yogaFlow.find(yogaPose => yogaPose.order - 1 === pose.order);
      poseToSwap.order = poseToSwap.order - 1;
      pose.order = pose.order + 1;
    }

    yogaFlow.sort(this.sortByOrder);
    this._yogaFlow.next(yogaFlow);
  }

}
