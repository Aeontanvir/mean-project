import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { Cost } from 'src/app/models/cost.model';
import { Project } from 'src/app/models/project.model';
import { CostService } from 'src/app/services/cost.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-last-projects',
  templateUrl: './last-projects.component.html',
  styleUrls: ['./last-projects.component.scss']
})
export class LastProjectsComponent implements OnInit {

  displayedColumns: string[] = ['title', 'budget', 'createdAt', 'id'];
  projects: Project[] = [];
  costs: Cost[] = [];

  chartDisplayFlag = false;

  constructor(private _projectService: ProjectService, private _costService: CostService) {

  }
  ngOnInit(): void {
    this.getProjects();
  }


  getProjects() {
    this._projectService.getAll({ offset: 0, limit: 7 }).subscribe(resp => {
      this.projects = resp.data;
      if(this.projects.length > 0){
        this.onDetailsclick(this.projects[0]._id)
      }
    })
  }

  onDetailsclick(projectId: String) {
    this.costs = [];
    this._costService.getAll({ projectid: projectId }).subscribe(resp => {
      this.costs = resp
    })
  }



}
