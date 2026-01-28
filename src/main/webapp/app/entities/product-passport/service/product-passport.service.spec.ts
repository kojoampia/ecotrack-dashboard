import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IProductPassport } from '../product-passport.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../product-passport.test-samples';

import { ProductPassportService, RestProductPassport } from './product-passport.service';

const requireRestSample: RestProductPassport = {
  ...sampleWithRequiredData,
  createdDate: sampleWithRequiredData.createdDate?.toJSON(),
};

describe('ProductPassport Service', () => {
  let service: ProductPassportService;
  let httpMock: HttpTestingController;
  let expectedResult: IProductPassport | IProductPassport[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ProductPassportService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a ProductPassport', () => {
      const productPassport = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(productPassport).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ProductPassport', () => {
      const productPassport = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(productPassport).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ProductPassport', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ProductPassport', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ProductPassport', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addProductPassportToCollectionIfMissing', () => {
      it('should add a ProductPassport to an empty array', () => {
        const productPassport: IProductPassport = sampleWithRequiredData;
        expectedResult = service.addProductPassportToCollectionIfMissing([], productPassport);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(productPassport);
      });

      it('should not add a ProductPassport to an array that contains it', () => {
        const productPassport: IProductPassport = sampleWithRequiredData;
        const productPassportCollection: IProductPassport[] = [
          {
            ...productPassport,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addProductPassportToCollectionIfMissing(productPassportCollection, productPassport);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ProductPassport to an array that doesn't contain it", () => {
        const productPassport: IProductPassport = sampleWithRequiredData;
        const productPassportCollection: IProductPassport[] = [sampleWithPartialData];
        expectedResult = service.addProductPassportToCollectionIfMissing(productPassportCollection, productPassport);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(productPassport);
      });

      it('should add only unique ProductPassport to an array', () => {
        const productPassportArray: IProductPassport[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const productPassportCollection: IProductPassport[] = [sampleWithRequiredData];
        expectedResult = service.addProductPassportToCollectionIfMissing(productPassportCollection, ...productPassportArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const productPassport: IProductPassport = sampleWithRequiredData;
        const productPassport2: IProductPassport = sampleWithPartialData;
        expectedResult = service.addProductPassportToCollectionIfMissing([], productPassport, productPassport2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(productPassport);
        expect(expectedResult).toContain(productPassport2);
      });

      it('should accept null and undefined values', () => {
        const productPassport: IProductPassport = sampleWithRequiredData;
        expectedResult = service.addProductPassportToCollectionIfMissing([], null, productPassport, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(productPassport);
      });

      it('should return initial array if no ProductPassport is added', () => {
        const productPassportCollection: IProductPassport[] = [sampleWithRequiredData];
        expectedResult = service.addProductPassportToCollectionIfMissing(productPassportCollection, undefined, null);
        expect(expectedResult).toEqual(productPassportCollection);
      });
    });

    describe('compareProductPassport', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareProductPassport(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareProductPassport(entity1, entity2);
        const compareResult2 = service.compareProductPassport(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareProductPassport(entity1, entity2);
        const compareResult2 = service.compareProductPassport(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareProductPassport(entity1, entity2);
        const compareResult2 = service.compareProductPassport(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
