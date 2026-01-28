import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';
import { Scope } from 'app/entities/enumerations/scope.model';
import { EmissionRecordService } from '../service/emission-record.service';
import { IEmissionRecord } from '../emission-record.model';
import { EmissionRecordFormService, EmissionRecordFormGroup } from './emission-record-form.service';

@Component({
  standalone: true,
  selector: 'jhi-emission-record-update',
  templateUrl: './emission-record-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule],
})
export class EmissionRecordUpdateComponent implements OnInit {
  isSaving = false;
  emissionRecord: IEmissionRecord | null = null;
  scopeValues = Object.keys(Scope);

  productsSharedCollection: IProduct[] = [];

  editForm: EmissionRecordFormGroup = this.emissionRecordFormService.createEmissionRecordFormGroup();

  constructor(
    protected emissionRecordService: EmissionRecordService,
    protected emissionRecordFormService: EmissionRecordFormService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareProduct = (o1: IProduct | null, o2: IProduct | null): boolean => this.productService.compareProduct(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ emissionRecord }) => {
      this.emissionRecord = emissionRecord;
      if (emissionRecord) {
        this.updateForm(emissionRecord);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const emissionRecord = this.emissionRecordFormService.getEmissionRecord(this.editForm);
    if (emissionRecord.id !== null) {
      this.subscribeToSaveResponse(this.emissionRecordService.update(emissionRecord));
    } else {
      this.subscribeToSaveResponse(this.emissionRecordService.create(emissionRecord));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmissionRecord>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(emissionRecord: IEmissionRecord): void {
    this.emissionRecord = emissionRecord;
    this.emissionRecordFormService.resetForm(this.editForm, emissionRecord);

    this.productsSharedCollection = this.productService.addProductToCollectionIfMissing<IProduct>(
      this.productsSharedCollection,
      emissionRecord.product,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.productService
      .query()
      .pipe(map((res: HttpResponse<IProduct[]>) => res.body ?? []))
      .pipe(
        map((products: IProduct[]) =>
          this.productService.addProductToCollectionIfMissing<IProduct>(products, this.emissionRecord?.product),
        ),
      )
      .subscribe((products: IProduct[]) => (this.productsSharedCollection = products));
  }
}
