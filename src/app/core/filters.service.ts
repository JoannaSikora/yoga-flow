import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PoseBodyParts } from '../shared/enums/poseBodyParts';
import { PoseLevel } from '../shared/enums/poseLevel';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  private _bodyPartsFilters: BehaviorSubject<PoseBodyParts[]> = new BehaviorSubject<PoseBodyParts[]>([]);
  private _levelsFilters: BehaviorSubject<PoseLevel[]> = new BehaviorSubject<PoseLevel[]>([]);

  get levelsFilters$(): Observable<PoseLevel[]> {
    return this._levelsFilters.asObservable();
  }

  public setLevelsFilters(levelsFilters: PoseLevel[]): void {
    this._levelsFilters.next(levelsFilters);
  }

  get bodyPartsFilters$(): Observable<PoseBodyParts[]> {
    return this._bodyPartsFilters.asObservable();
  }

  public setBodyPartsFilters(bodyPartsFilters: PoseBodyParts[]): void {
    this._bodyPartsFilters.next(bodyPartsFilters);
  }

}
