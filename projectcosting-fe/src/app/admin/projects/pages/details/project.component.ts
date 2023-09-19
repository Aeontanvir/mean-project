import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { CostCreateModalComponent } from '../../components/cost-create-modal/cost-create-modal.component';
import { CostService } from 'src/app/services/cost.service';
import { Project } from 'src/app/models/project.model';
import { Cost } from 'src/app/models/cost.model';
import { MESSAGE } from 'src/app/app.constants';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  id!: any;
  modalRef: any = null;
  displayedColumns: string[] = ['title', 'description', 'amount', 'createdAt', 'updatedAt', 'id'];
  project!: Project;
  costs: Cost[] = [];
  totalCost: number = 0;
  constructor(
    private dialog: MatDialog,
    private _router: Router,
    private _route: ActivatedRoute,
    private _projectService: ProjectService,
    private _costService: CostService,
  ) { }
  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get("id");
    this.getProject();
    this.getCosts();

  }

  getProject() {
    this._projectService.getOne(this.id).subscribe(resp => {
      this.project = resp;
    })
  }
  getCosts() {
    this._costService.getAll({projectid: this.id}).subscribe(resp => {
      this.costs = resp;
      this.totalCost = 0;
      resp.forEach((item: Cost)=>{
        this.totalCost = this.totalCost + item.amount;
      })
    })
  }

  onDeleteClick(id: String) {
    if (confirm(MESSAGE.DELETE_CONFIRMATION)) {
      this._costService.delete(id).subscribe(resp => {
        this.getCosts()
      })
    }

  }

  openCreateModal(data = {}) {
    this.modalRef = this.dialog.open(CostCreateModalComponent, {
      maxWidth: "600px",
      minWidth: "500px",
      data: {
        ...data,
        projectId: this.id
      }
    });
    this.modalRef.afterClosed().subscribe((resp: { reload: any; }) => {
      resp && resp.reload && this.getCosts();
    });
  }
  onEditClick(id: String) {
    this.openCreateModal({ isUpdate: true, costId: id })
  }

  onDetailsclick(id: String) {
    this._router.navigate([`admin/projects/${id}`])
  }
}
