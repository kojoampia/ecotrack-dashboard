import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IEmissionRecord } from '../emission-record.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../emission-record.test-samples';

import { EmissionRecordService, RestEmissionRecord } from './emission-record.service';

const requireRestSample: RestEmissionRecord = {
  ...sampleWithRequiredData,
  dateRecorded: sampleWithRequiredData.dateRecorded?.format(DATE_FORMAT),
};

describe('EmissionRecord Service', () => {
  let service: EmissionRecordService;
  let httpMock: HttpTestingController;
  let expectedResult: IEmissionRecord | IEmissionRecord[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EmissionRecordService);
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

    it('should create a EmissionRecord', () => {
      const emissionRecord = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(emissionRecord).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a EmissionRecord', () => {
      const emissionRecord = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(emissionRecord).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a EmissionRecord', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of EmissionRecord', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a EmissionRecord', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addEmissionRecordToCollectionIfMissing', () => {
      it('should add a EmissionRecord to an empty array', () => {
        const emissionRecord: IEmissionRecord = sampleWithRequiredData;
        expectedResult = service.addEmissionRecordToCollectionIfMissing([], emissionRecord);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(emissionRecord);
      });

      it('should not add a EmissionRecord to an array that contains it', () => {
        const emissionRecord: IEmissionRecord = sampleWithRequiredData;
        const emissionRecordCollection: IEmissionRecord[] = [
          {
            ...emissionRecord,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addEmissionRecordToCollectionIfMissing(emissionRecordCollection, emissionRecord);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a EmissionRecord to an array that doesn't contain it", () => {
        const emissionRecord: IEmissionRecord = sampleWithRequiredData;
        const emissionRecordCollection: IEmissionRecord[] = [sampleWithPartialData];
        expectedResult = service.addEmissionRecordToCollectionIfMissing(emissionRecordCollection, emissionRecord);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(emissionRecord);
      });

      it('should add only unique EmissionRecord to an array', () => {
        const emissionRecordArray: IEmissionRecord[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const emissionRecordCollection: IEmissionRecord[] = [sampleWithRequiredData];
        expectedResult = service.addEmissionRecordToCollectionIfMissing(emissionRecordCollection, ...emissionRecordArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const emissionRecord: IEmissionRecord = sampleWithRequiredData;
        const emissionRecord2: IEmissionRecord = sampleWithPartialData;
        expectedResult = service.addEmissionRecordToCollectionIfMissing([], emissionRecord, emissionRecord2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(emissionRecord);
        expect(expectedResult).toContain(emissionRecord2);
      });

      it('should accept null and undefined values', () => {
        const emissionRecord: IEmissionRecord = sampleWithRequiredData;
        expectedResult = service.addEmissionRecordToCollectionIfMissing([], null, emissionRecord, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(emissionRecord);
      });

      it('should return initial array if no EmissionRecord is added', () => {
        const emissionRecordCollection: IEmissionRecord[] = [sampleWithRequiredData];
        expectedResult = service.addEmissionRecordToCollectionIfMissing(emissionRecordCollection, undefined, null);
        expect(expectedResult).toEqual(emissionRecordCollection);
      });
    });

    describe('compareEmissionRecord', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareEmissionRecord(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareEmissionRecord(entity1, entity2);
        const compareResult2 = service.compareEmissionRecord(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareEmissionRecord(entity1, entity2);
        const compareResult2 = service.compareEmissionRecord(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareEmissionRecord(entity1, entity2);
        const compareResult2 = service.compareEmissionRecord(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
