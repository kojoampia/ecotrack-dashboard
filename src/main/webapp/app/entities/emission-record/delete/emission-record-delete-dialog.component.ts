import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IEmissionRecord } from '../emission-record.model';
import { EmissionRecordService } from '../service/emission-record.service';

@Component({
  standalone: true,
  templateUrl: './emission-record-delete-dialog.component.html',
  imports: [SharedModule, FormsModule, MatDialogModule, MatButtonModule],
})
export class EmissionRecordDeleteDialogComponent {
  emissionRecord?: IEmissionRecord;

  constructor(
    protected emissionRecordService: EmissionRecordService,
    public dialogRef: MatDialogRef<EmissionRecordDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { emissionRecord: IEmissionRecord },
  ) {
    this.emissionRecord = data.emissionRecord;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  confirmDelete(id: number): void {
    this.emissionRecordService.delete(id).subscribe(() => {
      this.dialogRef.close(ITEM_DELETED_EVENT);
    });
  }
}
