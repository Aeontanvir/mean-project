import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MESSAGE } from 'src/app/app.constants';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-create-modal',
  templateUrl: './project-create-modal.component.html',
  styleUrls: ['./project-create-modal.component.scss']
})
export class ProjectCreateModalComponent implements OnInit{
  projectId!: String;
  isUpdate = false;
  project: any = {};
  constructor(
    public dialogRef: MatDialogRef<ProjectCreateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private _projectService: ProjectService,
  ) {
    this.isUpdate = data && data.isUpdate;
    this.projectId = data && data.projectId;
  }

  ngOnInit(): void {
    if(this.isUpdate){
      this.getProject();
    }
  }

  getProject(){
    this._projectService.getOne(this.projectId).subscribe(resp => {
      this.buildObject(resp)
    })
  }

  buildObject(data:any) {
    this.project = {
      title: data && data.title,
      description: data && data.description,
      budget: data && data.budget,
    }
  }

  onSubmit() {
    const payload = { ...this.project };
    if (this.isUpdate) {
      this._projectService.update(this.projectId, payload).subscribe(resp => {
        this._snackBar.open(MESSAGE.PROJECT_UPDATED, MESSAGE.SUCCESS, { duration: 3000 });
        this.dialogRef.close({ reload: true })
      })
    }else{
      this._projectService.create(payload).subscribe(resp => {
        this._snackBar.open(MESSAGE.PROJECT_CTEATED, MESSAGE.SUCCESS, { duration: 3000 });
        this.dialogRef.close({ reload: true })
      })
    }
  }
}
