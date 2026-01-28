import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../product-passport.test-samples';

import { ProductPassportFormService } from './product-passport-form.service';

describe('ProductPassport Form Service', () => {
  let service: ProductPassportFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductPassportFormService);
  });

  describe('Service methods', () => {
    describe('createProductPassportFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createProductPassportFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            passportData: expect.any(Object),
            version: expect.any(Object),
            createdDate: expect.any(Object),
            product: expect.any(Object),
          }),
        );
      });

      it('passing IProductPassport should create a new form with FormGroup', () => {
        const formGroup = service.createProductPassportFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            passportData: expect.any(Object),
            version: expect.any(Object),
            createdDate: expect.any(Object),
            product: expect.any(Object),
          }),
        );
      });
    });

    describe('getProductPassport', () => {
      it('should return NewProductPassport for default ProductPassport initial value', () => {
        const formGroup = service.createProductPassportFormGroup(sampleWithNewData);

        const productPassport = service.getProductPassport(formGroup) as any;

        expect(productPassport).toMatchObject(sampleWithNewData);
      });

      it('should return NewProductPassport for empty ProductPassport initial value', () => {
        const formGroup = service.createProductPassportFormGroup();

        const productPassport = service.getProductPassport(formGroup) as any;

        expect(productPassport).toMatchObject({});
      });

      it('should return IProductPassport', () => {
        const formGroup = service.createProductPassportFormGroup(sampleWithRequiredData);

        const productPassport = service.getProductPassport(formGroup) as any;

        expect(productPassport).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IProductPassport should not enable id FormControl', () => {
        const formGroup = service.createProductPassportFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewProductPassport should disable id FormControl', () => {
        const formGroup = service.createProductPassportFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
