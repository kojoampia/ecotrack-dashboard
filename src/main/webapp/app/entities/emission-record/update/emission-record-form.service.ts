import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEmissionRecord, NewEmissionRecord } from '../emission-record.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEmissionRecord for edit and NewEmissionRecordFormGroupInput for create.
 */
type EmissionRecordFormGroupInput = IEmissionRecord | PartialWithRequiredKeyOf<NewEmissionRecord>;

type EmissionRecordFormDefaults = Pick<NewEmissionRecord, 'id'>;

type EmissionRecordFormGroupContent = {
  id: FormControl<IEmissionRecord['id'] | NewEmissionRecord['id']>;
  scope: FormControl<IEmissionRecord['scope']>;
  carbonGrams: FormControl<IEmissionRecord['carbonGrams']>;
  dateRecorded: FormControl<IEmissionRecord['dateRecorded']>;
  source: FormControl<IEmissionRecord['source']>;
  product: FormControl<IEmissionRecord['product']>;
};

export type EmissionRecordFormGroup = FormGroup<EmissionRecordFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EmissionRecordFormService {
  createEmissionRecordFormGroup(emissionRecord: EmissionRecordFormGroupInput = { id: null }): EmissionRecordFormGroup {
    const emissionRecordRawValue = {
      ...this.getFormDefaults(),
      ...emissionRecord,
    };
    return new FormGroup<EmissionRecordFormGroupContent>({
      id: new FormControl(
        { value: emissionRecordRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      scope: new FormControl(emissionRecordRawValue.scope, {
        validators: [Validators.required],
      }),
      carbonGrams: new FormControl(emissionRecordRawValue.carbonGrams, {
        validators: [Validators.required],
      }),
      dateRecorded: new FormControl(emissionRecordRawValue.dateRecorded),
      source: new FormControl(emissionRecordRawValue.source),
      product: new FormControl(emissionRecordRawValue.product),
    });
  }

  getEmissionRecord(form: EmissionRecordFormGroup): IEmissionRecord | NewEmissionRecord {
    return form.getRawValue() as IEmissionRecord | NewEmissionRecord;
  }

  resetForm(form: EmissionRecordFormGroup, emissionRecord: EmissionRecordFormGroupInput): void {
    const emissionRecordRawValue = { ...this.getFormDefaults(), ...emissionRecord };
    form.reset(
      {
        ...emissionRecordRawValue,
        id: { value: emissionRecordRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): EmissionRecordFormDefaults {
    return {
      id: null,
    };
  }
}
