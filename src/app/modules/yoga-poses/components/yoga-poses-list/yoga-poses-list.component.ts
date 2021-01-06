import { Component, OnInit } from '@angular/core';
import { YogaPosesService } from '../../../../core/yoga-poses.service';
import { YogaPose } from '../../../../shared/models/yoga-pose';
import { FiltersService } from '../../../../core/filters.service';
import { PoseBodyParts } from '../../../../shared/enums/poseBodyParts';
import { PoseLevel } from '../../../../shared/enums/poseLevel';

@Component({
  selector: 'app-yoga-poses-dashboard',
  templateUrl: './yoga-poses-list.component.html',
  styleUrls: ['./yoga-poses-list.component.scss'],
})
export class YogaPosesListComponent implements OnInit {
  public yogaPoses: YogaPose[];
  public bodyPartsFilters: PoseBodyParts[];
  public levelsFilters: PoseLevel[];

  constructor(
    private yogaPosesService: YogaPosesService,
    private filtersService: FiltersService) {
  }

  public ngOnInit(): void {
    this.filtersService.bodyPartsFilters$.subscribe(bpf => {
      this.bodyPartsFilters = bpf;
      this.getYogaPoses(this.bodyPartsFilters, this.levelsFilters);
    });

    this.filtersService.levelsFilters$.subscribe(lev => {
      this.levelsFilters = lev;
      this.getYogaPoses(this.bodyPartsFilters, this.levelsFilters);
    });

  }

  private getYogaPoses(bodyPartsFilters, levelsFilters): void {
    this.yogaPosesService.getYogaPoses(bodyPartsFilters, levelsFilters).subscribe(poses => {
      this.yogaPoses = poses;
    });
  }

}
