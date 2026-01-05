import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';
import { EmissionRecordService } from '../service/emission-record.service';
import { IEmissionRecord } from '../emission-record.model';
import { EmissionRecordFormService } from './emission-record-form.service';

import { EmissionRecordUpdateComponent } from './emission-record-update.component';

describe('EmissionRecord Management Update Component', () => {
  let comp: EmissionRecordUpdateComponent;
  let fixture: ComponentFixture<EmissionRecordUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let emissionRecordFormService: EmissionRecordFormService;
  let emissionRecordService: EmissionRecordService;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), EmissionRecordUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(EmissionRecordUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EmissionRecordUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    emissionRecordFormService = TestBed.inject(EmissionRecordFormService);
    emissionRecordService = TestBed.inject(EmissionRecordService);
    productService = TestBed.inject(ProductService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Product query and add missing value', () => {
      const emissionRecord: IEmissionRecord = { id: 456 };
      const product: IProduct = { id: 24191 };
      emissionRecord.product = product;

      const productCollection: IProduct[] = [{ id: 17031 }];
      jest.spyOn(productService, 'query').mockReturnValue(of(new HttpResponse({ body: productCollection })));
      const additionalProducts = [product];
      const expectedCollection: IProduct[] = [...additionalProducts, ...productCollection];
      jest.spyOn(productService, 'addProductToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ emissionRecord });
      comp.ngOnInit();

      expect(productService.query).toHaveBeenCalled();
      expect(productService.addProductToCollectionIfMissing).toHaveBeenCalledWith(
        productCollection,
        ...additionalProducts.map(expect.objectContaining),
      );
      expect(comp.productsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const emissionRecord: IEmissionRecord = { id: 456 };
      const product: IProduct = { id: 1389 };
      emissionRecord.product = product;

      activatedRoute.data = of({ emissionRecord });
      comp.ngOnInit();

      expect(comp.productsSharedCollection).toContain(product);
      expect(comp.emissionRecord).toEqual(emissionRecord);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmissionRecord>>();
      const emissionRecord = { id: 123 };
      jest.spyOn(emissionRecordFormService, 'getEmissionRecord').mockReturnValue(emissionRecord);
      jest.spyOn(emissionRecordService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ emissionRecord });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: emissionRecord }));
      saveSubject.complete();

      // THEN
      expect(emissionRecordFormService.getEmissionRecord).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(emissionRecordService.update).toHaveBeenCalledWith(expect.objectContaining(emissionRecord));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmissionRecord>>();
      const emissionRecord = { id: 123 };
      jest.spyOn(emissionRecordFormService, 'getEmissionRecord').mockReturnValue({ id: null });
      jest.spyOn(emissionRecordService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ emissionRecord: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: emissionRecord }));
      saveSubject.complete();

      // THEN
      expect(emissionRecordFormService.getEmissionRecord).toHaveBeenCalled();
      expect(emissionRecordService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmissionRecord>>();
      const emissionRecord = { id: 123 };
      jest.spyOn(emissionRecordService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ emissionRecord });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(emissionRecordService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareProduct', () => {
      it('Should forward to productService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(productService, 'compareProduct');
        comp.compareProduct(entity, entity2);
        expect(productService.compareProduct).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
