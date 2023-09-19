import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectCreateModalComponent } from '../../components/project-create-modal/project-create-modal.component';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { MESSAGE } from 'src/app/app.constants';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  modalRef: any = null;
  displayedColumns: String[] = ['title', 'description', 'budget', 'createdAt', 'updatedAt', 'id'];
  projects: Project[] = [];
  pagination = {
    total: 200,
    limit: 10,
    offset: 0,
  }
  constructor(
    private _projectService: ProjectService,
    private dialog: MatDialog,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getProjects()
  }

  getProjects() {
    this._projectService.getAll({ offset: this.pagination.offset, limit: this.pagination.limit }).subscribe(resp => {
      this.projects = resp.data;
      this.pagination.total = resp.total;
    })
  }

  onDeleteClick(id: String) {
    if (confirm(MESSAGE.DELETE_CONFIRMATION)) {
      this._projectService.delete(id).subscribe(resp => {
        this.getProjects()
      })
    }

  }

  openCreateModal(data = {}) {
    this.modalRef = this.dialog.open(ProjectCreateModalComponent, {
      width: "500px",
      data: {
        ...data
      }
    });
    this.modalRef.afterClosed().subscribe((resp: { reload: any; }) => {
      resp && resp.reload && this.getProjects();
    });
  }
  onEditClick(id: String) {
    this.openCreateModal({ isUpdate: true, projectId: id })
  }

  onDetailsclick(id: String) {
    this._router.navigate([`admin/projects/${id}`])
  }

  onPaginationChange(event: any) {
    this.pagination.offset = event.pageIndex;
    this.pagination.limit = event.pageSize;
    this.getProjects();
  }
}
