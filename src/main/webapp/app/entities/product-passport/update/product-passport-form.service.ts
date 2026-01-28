import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IProductPassport, NewProductPassport } from '../product-passport.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProductPassport for edit and NewProductPassportFormGroupInput for create.
 */
type ProductPassportFormGroupInput = IProductPassport | PartialWithRequiredKeyOf<NewProductPassport>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IProductPassport | NewProductPassport> = Omit<T, 'createdDate'> & {
  createdDate?: string | null;
};

type ProductPassportFormRawValue = FormValueOf<IProductPassport>;

type NewProductPassportFormRawValue = FormValueOf<NewProductPassport>;

type ProductPassportFormDefaults = Pick<NewProductPassport, 'id' | 'createdDate'>;

type ProductPassportFormGroupContent = {
  id: FormControl<ProductPassportFormRawValue['id'] | NewProductPassport['id']>;
  passportData: FormControl<ProductPassportFormRawValue['passportData']>;
  version: FormControl<ProductPassportFormRawValue['version']>;
  createdDate: FormControl<ProductPassportFormRawValue['createdDate']>;
  product: FormControl<ProductPassportFormRawValue['product']>;
};

export type ProductPassportFormGroup = FormGroup<ProductPassportFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProductPassportFormService {
  createProductPassportFormGroup(productPassport: ProductPassportFormGroupInput = { id: null }): ProductPassportFormGroup {
    const productPassportRawValue = this.convertProductPassportToProductPassportRawValue({
      ...this.getFormDefaults(),
      ...productPassport,
    });
    return new FormGroup<ProductPassportFormGroupContent>({
      id: new FormControl(
        { value: productPassportRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      passportData: new FormControl(productPassportRawValue.passportData),
      version: new FormControl(productPassportRawValue.version),
      createdDate: new FormControl(productPassportRawValue.createdDate),
      product: new FormControl(productPassportRawValue.product),
    });
  }

  getProductPassport(form: ProductPassportFormGroup): IProductPassport | NewProductPassport {
    return this.convertProductPassportRawValueToProductPassport(
      form.getRawValue() as ProductPassportFormRawValue | NewProductPassportFormRawValue,
    );
  }

  resetForm(form: ProductPassportFormGroup, productPassport: ProductPassportFormGroupInput): void {
    const productPassportRawValue = this.convertProductPassportToProductPassportRawValue({ ...this.getFormDefaults(), ...productPassport });
    form.reset(
      {
        ...productPassportRawValue,
        id: { value: productPassportRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ProductPassportFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdDate: currentTime,
    };
  }

  private convertProductPassportRawValueToProductPassport(
    rawProductPassport: ProductPassportFormRawValue | NewProductPassportFormRawValue,
  ): IProductPassport | NewProductPassport {
    return {
      ...rawProductPassport,
      createdDate: dayjs(rawProductPassport.createdDate, DATE_TIME_FORMAT),
    };
  }

  private convertProductPassportToProductPassportRawValue(
    productPassport: IProductPassport | (Partial<NewProductPassport> & ProductPassportFormDefaults),
  ): ProductPassportFormRawValue | PartialWithRequiredKeyOf<NewProductPassportFormRawValue> {
    return {
      ...productPassport,
      createdDate: productPassport.createdDate ? productPassport.createdDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
