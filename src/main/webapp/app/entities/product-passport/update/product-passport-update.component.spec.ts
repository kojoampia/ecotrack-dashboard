import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';
import { ProductPassportService } from '../service/product-passport.service';
import { IProductPassport } from '../product-passport.model';
import { ProductPassportFormService } from './product-passport-form.service';

import { ProductPassportUpdateComponent } from './product-passport-update.component';

describe('ProductPassport Management Update Component', () => {
  let comp: ProductPassportUpdateComponent;
  let fixture: ComponentFixture<ProductPassportUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let productPassportFormService: ProductPassportFormService;
  let productPassportService: ProductPassportService;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ProductPassportUpdateComponent],
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
      .overrideTemplate(ProductPassportUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProductPassportUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    productPassportFormService = TestBed.inject(ProductPassportFormService);
    productPassportService = TestBed.inject(ProductPassportService);
    productService = TestBed.inject(ProductService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Product query and add missing value', () => {
      const productPassport: IProductPassport = { id: 456 };
      const product: IProduct = { id: 14194 };
      productPassport.product = product;

      const productCollection: IProduct[] = [{ id: 20829 }];
      jest.spyOn(productService, 'query').mockReturnValue(of(new HttpResponse({ body: productCollection })));
      const additionalProducts = [product];
      const expectedCollection: IProduct[] = [...additionalProducts, ...productCollection];
      jest.spyOn(productService, 'addProductToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ productPassport });
      comp.ngOnInit();

      expect(productService.query).toHaveBeenCalled();
      expect(productService.addProductToCollectionIfMissing).toHaveBeenCalledWith(
        productCollection,
        ...additionalProducts.map(expect.objectContaining),
      );
      expect(comp.productsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const productPassport: IProductPassport = { id: 456 };
      const product: IProduct = { id: 26183 };
      productPassport.product = product;

      activatedRoute.data = of({ productPassport });
      comp.ngOnInit();

      expect(comp.productsSharedCollection).toContain(product);
      expect(comp.productPassport).toEqual(productPassport);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProductPassport>>();
      const productPassport = { id: 123 };
      jest.spyOn(productPassportFormService, 'getProductPassport').mockReturnValue(productPassport);
      jest.spyOn(productPassportService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ productPassport });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: productPassport }));
      saveSubject.complete();

      // THEN
      expect(productPassportFormService.getProductPassport).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(productPassportService.update).toHaveBeenCalledWith(expect.objectContaining(productPassport));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProductPassport>>();
      const productPassport = { id: 123 };
      jest.spyOn(productPassportFormService, 'getProductPassport').mockReturnValue({ id: null });
      jest.spyOn(productPassportService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ productPassport: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: productPassport }));
      saveSubject.complete();

      // THEN
      expect(productPassportFormService.getProductPassport).toHaveBeenCalled();
      expect(productPassportService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProductPassport>>();
      const productPassport = { id: 123 };
      jest.spyOn(productPassportService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ productPassport });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(productPassportService.update).toHaveBeenCalled();
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
