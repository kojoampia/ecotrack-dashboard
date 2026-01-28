import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';
import { ProductPassportService } from '../service/product-passport.service';
import { IProductPassport } from '../product-passport.model';
import { ProductPassportFormService, ProductPassportFormGroup } from './product-passport-form.service';

@Component({
  standalone: true,
  selector: 'jhi-product-passport-update',
  templateUrl: './product-passport-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ProductPassportUpdateComponent implements OnInit {
  isSaving = false;
  productPassport: IProductPassport | null = null;

  productsSharedCollection: IProduct[] = [];

  editForm: ProductPassportFormGroup = this.productPassportFormService.createProductPassportFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected productPassportService: ProductPassportService,
    protected productPassportFormService: ProductPassportFormService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareProduct = (o1: IProduct | null, o2: IProduct | null): boolean => this.productService.compareProduct(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productPassport }) => {
      this.productPassport = productPassport;
      if (productPassport) {
        this.updateForm(productPassport);
      }

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('ecoTrackProApp.error', { ...err, key: 'error.file.' + err.key })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productPassport = this.productPassportFormService.getProductPassport(this.editForm);
    if (productPassport.id !== null) {
      this.subscribeToSaveResponse(this.productPassportService.update(productPassport));
    } else {
      this.subscribeToSaveResponse(this.productPassportService.create(productPassport));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductPassport>>): void {
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

  protected updateForm(productPassport: IProductPassport): void {
    this.productPassport = productPassport;
    this.productPassportFormService.resetForm(this.editForm, productPassport);

    this.productsSharedCollection = this.productService.addProductToCollectionIfMissing<IProduct>(
      this.productsSharedCollection,
      productPassport.product,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.productService
      .query()
      .pipe(map((res: HttpResponse<IProduct[]>) => res.body ?? []))
      .pipe(
        map((products: IProduct[]) =>
          this.productService.addProductToCollectionIfMissing<IProduct>(products, this.productPassport?.product),
        ),
      )
      .subscribe((products: IProduct[]) => (this.productsSharedCollection = products));
  }
}
