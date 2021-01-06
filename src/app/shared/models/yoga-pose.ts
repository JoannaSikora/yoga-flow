import { PoseBodyParts } from '../enums/poseBodyParts';
import { PoseLevel } from '../enums/poseLevel';

export interface YogaPose {
  id: number;
  englishName: string;
  sanskritName: string;
  bodyParts: PoseBodyParts[];
  icon: string;
  level: PoseLevel;
}
