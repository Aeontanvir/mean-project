import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MESSAGE } from 'src/app/app.constants';
import { CostService } from 'src/app/services/cost.service';

@Component({
  selector: 'app-cost-create-modal',
  templateUrl: './cost-create-modal.component.html',
  styleUrls: ['./cost-create-modal.component.scss']
})
export class CostCreateModalComponent implements OnInit{
  costId!: String;
  projectId!: String;
  isUpdate = false;
  cost: any = {};
  constructor(
    public dialogRef: MatDialogRef<CostCreateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private _costService: CostService,
  ) {
    this.isUpdate = data && data.isUpdate;
    this.projectId = data && data.projectId;
    this.costId = data && data.costId;
  }

  ngOnInit(): void {
    if(this.isUpdate){
      this.getCost();
    }
  }

  getCost(){
    this._costService.getOne(this.costId).subscribe(resp => {
      this.buildObject(resp)
    })
  }

  buildObject(data:any) {
    this.cost = {
      title: data && data.title,
      description: data && data.description,
      amount: data && data.amount,
    }
  }

  onSubmit() {
    const payload = { ...this.cost, projectId: this.projectId };
    if (this.isUpdate) {
      this._costService.update(this.costId, payload).subscribe(resp => {
        this._snackBar.open(MESSAGE.COST_UPDATED, MESSAGE.SUCCESS, { duration: 3000 });
        this.dialogRef.close({ reload: true })
      })
    }else{
      this._costService.create(payload).subscribe(resp => {
        this._snackBar.open(MESSAGE.COST_CTEATED, MESSAGE.SUCCESS, { duration: 3000 });
        this.dialogRef.close({ reload: true })
      })
    }
  }
}
