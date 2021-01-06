import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PoseBodyParts } from '../shared/enums/poseBodyParts';
import { PoseLevel } from '../shared/enums/poseLevel';
import { YogaPose } from '../shared/models/yoga-pose';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YogaPosesService {

  constructor(private http: HttpClient) {
  }

  public getYogaPoses(bodyPartsFilters: PoseBodyParts[], levelsFilters: PoseLevel[]): Observable<YogaPose[]> {
    let yogaPoses = this.http.get('../assets/yoga-poses.json').pipe(
      map((items: any) => items.yogaPoses)
    );

    if (bodyPartsFilters && bodyPartsFilters.length > 0) {
      yogaPoses = yogaPoses.pipe(
        map(items => items.filter(pose => bodyPartsFilters.some(bodyPart => pose.bodyParts.includes(bodyPart))))
      );
    }

    if (levelsFilters && levelsFilters.length > 0) {
      yogaPoses = yogaPoses.pipe(
        map(items => items.filter(pose => levelsFilters.some(level => pose.level === level)))
      );
    }

    return yogaPoses;
  }
}
