import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IEmissionRecord } from '../emission-record.model';
import { EmissionRecordService } from '../service/emission-record.service';

@Component({
  standalone: true,
  templateUrl: './emission-record-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class EmissionRecordDeleteDialogComponent {
  emissionRecord?: IEmissionRecord;

  constructor(
    protected emissionRecordService: EmissionRecordService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.emissionRecordService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
