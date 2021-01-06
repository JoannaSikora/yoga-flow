import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router} from '@angular/router';
import { filter } from 'rxjs/operators';
import { PoseLevel } from '../../enums/poseLevel';
import { PoseBodyParts } from '../../enums/poseBodyParts';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FiltersService } from '../../../core/filters.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public isShowing: boolean = true;
  public currentUrl: string;
  public poseLevel = Object.keys(PoseLevel).map(key => PoseLevel[key]).filter(k => !(k >= 0));
  public poseBodyParts = Object.keys(PoseBodyParts).map(key => PoseBodyParts[key]).filter(k => !(k >= 0));
  public filtersForm: FormGroup;

  get poseLevelsArray(): FormArray {
    return this.filtersForm.get('poseLevels') as FormArray;
  }

  get bodyPartsArray(): FormArray {
    return this.filtersForm.get('bodyParts') as FormArray;
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private filtersService: FiltersService) {
  }

  public ngOnInit(): void {
    this.currentUrl = this.router.url;

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
      .subscribe((event: any) => {
        this.currentUrl = event.url;
      });


    this.filtersForm = this.fb.group({
      poseLevels: new FormArray([]),
      bodyParts: new FormArray([])
    });
  }

  public onPoseLevelChange(e: { target: HTMLInputElement }): void {
    if (e.target.checked) {
      this.poseLevelsArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      this.poseLevelsArray.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          this.poseLevelsArray.removeAt(i);
          return;
        }
        i++;
      });
    }

    this.filtersService.setLevelsFilters(this.poseLevelsArray.controls.map(pl => pl.value));
  }

  public onBodyPartsChange(e: { target: HTMLInputElement }): void {
    if (e.target.checked) {
      this.bodyPartsArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      this.bodyPartsArray.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          this.bodyPartsArray.removeAt(i);
          return;
        }
        i++;
      });
    }

    this.filtersService.setBodyPartsFilters(this.bodyPartsArray.controls.map(bp => bp.value));
  }

  public toggleSidebar(): void {
    this.isShowing = !this.isShowing;
  }

}
