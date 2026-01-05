import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../emission-record.test-samples';

import { EmissionRecordFormService } from './emission-record-form.service';

describe('EmissionRecord Form Service', () => {
  let service: EmissionRecordFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmissionRecordFormService);
  });

  describe('Service methods', () => {
    describe('createEmissionRecordFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEmissionRecordFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            scope: expect.any(Object),
            carbonGrams: expect.any(Object),
            dateRecorded: expect.any(Object),
            source: expect.any(Object),
            product: expect.any(Object),
          }),
        );
      });

      it('passing IEmissionRecord should create a new form with FormGroup', () => {
        const formGroup = service.createEmissionRecordFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            scope: expect.any(Object),
            carbonGrams: expect.any(Object),
            dateRecorded: expect.any(Object),
            source: expect.any(Object),
            product: expect.any(Object),
          }),
        );
      });
    });

    describe('getEmissionRecord', () => {
      it('should return NewEmissionRecord for default EmissionRecord initial value', () => {
        const formGroup = service.createEmissionRecordFormGroup(sampleWithNewData);

        const emissionRecord = service.getEmissionRecord(formGroup) as any;

        expect(emissionRecord).toMatchObject(sampleWithNewData);
      });

      it('should return NewEmissionRecord for empty EmissionRecord initial value', () => {
        const formGroup = service.createEmissionRecordFormGroup();

        const emissionRecord = service.getEmissionRecord(formGroup) as any;

        expect(emissionRecord).toMatchObject({});
      });

      it('should return IEmissionRecord', () => {
        const formGroup = service.createEmissionRecordFormGroup(sampleWithRequiredData);

        const emissionRecord = service.getEmissionRecord(formGroup) as any;

        expect(emissionRecord).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEmissionRecord should not enable id FormControl', () => {
        const formGroup = service.createEmissionRecordFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEmissionRecord should disable id FormControl', () => {
        const formGroup = service.createEmissionRecordFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
