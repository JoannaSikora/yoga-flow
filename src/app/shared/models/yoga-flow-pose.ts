import { PoseBodyParts } from '../enums/poseBodyParts';
import { PoseLevel } from '../enums/poseLevel';

export interface YogaFlowPose {
  yogaFlowPoseId: number;
  id: number;
  englishName: string;
  sanskritName: string;
  bodyParts: PoseBodyParts[];
  icon: string;
  level: PoseLevel;
  order: number;
}
