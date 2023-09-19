import { Component } from '@angular/core';
import { Cost } from 'src/app/models/cost.model';
import { Project } from 'src/app/models/project.model';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-dashboard-block',
  templateUrl: './dashboard-block.component.html',
  styleUrls: ['./dashboard-block.component.scss']
})
export class DashboardBlockComponent {
  lastProject!: Project;
  lastCost!: Cost;

  projectCount!: Number;
  costCount!: Number;

  constructor(private _reportService: ReportService) {

  }
  ngOnInit(): void {
    this.getLastProject();
    this.getLastCost();
    this.geProjectCount();
    this.geCostCount();
  }

  getLastProject(){
    this._reportService.getLastProject().subscribe(resp=>{
      this.lastProject = resp.data && resp.data[0];
    })
  }
  getLastCost(){
    this._reportService.getLastCost().subscribe(resp=>{
      this.lastCost = resp.data && resp.data[0];
    })
  }

  geProjectCount(){
    this._reportService.getProjectCount().subscribe(resp=>{
      this.projectCount = resp.data && resp.data;
    })
  }
  geCostCount(){
    this._reportService.getCostCount().subscribe(resp=>{
      this.costCount = resp.data && resp.data;
    })
  }


}
