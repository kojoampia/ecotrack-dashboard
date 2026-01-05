import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEmissionRecord, NewEmissionRecord } from '../emission-record.model';

export type PartialUpdateEmissionRecord = Partial<IEmissionRecord> & Pick<IEmissionRecord, 'id'>;

type RestOf<T extends IEmissionRecord | NewEmissionRecord> = Omit<T, 'dateRecorded'> & {
  dateRecorded?: string | null;
};

export type RestEmissionRecord = RestOf<IEmissionRecord>;

export type NewRestEmissionRecord = RestOf<NewEmissionRecord>;

export type PartialUpdateRestEmissionRecord = RestOf<PartialUpdateEmissionRecord>;

export type EntityResponseType = HttpResponse<IEmissionRecord>;
export type EntityArrayResponseType = HttpResponse<IEmissionRecord[]>;

@Injectable({ providedIn: 'root' })
export class EmissionRecordService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/emission-records');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(emissionRecord: NewEmissionRecord): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(emissionRecord);
    return this.http
      .post<RestEmissionRecord>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(emissionRecord: IEmissionRecord): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(emissionRecord);
    return this.http
      .put<RestEmissionRecord>(`${this.resourceUrl}/${this.getEmissionRecordIdentifier(emissionRecord)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(emissionRecord: PartialUpdateEmissionRecord): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(emissionRecord);
    return this.http
      .patch<RestEmissionRecord>(`${this.resourceUrl}/${this.getEmissionRecordIdentifier(emissionRecord)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestEmissionRecord>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestEmissionRecord[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEmissionRecordIdentifier(emissionRecord: Pick<IEmissionRecord, 'id'>): number {
    return emissionRecord.id;
  }

  compareEmissionRecord(o1: Pick<IEmissionRecord, 'id'> | null, o2: Pick<IEmissionRecord, 'id'> | null): boolean {
    return o1 && o2 ? this.getEmissionRecordIdentifier(o1) === this.getEmissionRecordIdentifier(o2) : o1 === o2;
  }

  addEmissionRecordToCollectionIfMissing<Type extends Pick<IEmissionRecord, 'id'>>(
    emissionRecordCollection: Type[],
    ...emissionRecordsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const emissionRecords: Type[] = emissionRecordsToCheck.filter(isPresent);
    if (emissionRecords.length > 0) {
      const emissionRecordCollectionIdentifiers = emissionRecordCollection.map(
        emissionRecordItem => this.getEmissionRecordIdentifier(emissionRecordItem)!,
      );
      const emissionRecordsToAdd = emissionRecords.filter(emissionRecordItem => {
        const emissionRecordIdentifier = this.getEmissionRecordIdentifier(emissionRecordItem);
        if (emissionRecordCollectionIdentifiers.includes(emissionRecordIdentifier)) {
          return false;
        }
        emissionRecordCollectionIdentifiers.push(emissionRecordIdentifier);
        return true;
      });
      return [...emissionRecordsToAdd, ...emissionRecordCollection];
    }
    return emissionRecordCollection;
  }

  protected convertDateFromClient<T extends IEmissionRecord | NewEmissionRecord | PartialUpdateEmissionRecord>(
    emissionRecord: T,
  ): RestOf<T> {
    return {
      ...emissionRecord,
      dateRecorded: emissionRecord.dateRecorded?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restEmissionRecord: RestEmissionRecord): IEmissionRecord {
    return {
      ...restEmissionRecord,
      dateRecorded: restEmissionRecord.dateRecorded ? dayjs(restEmissionRecord.dateRecorded) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestEmissionRecord>): HttpResponse<IEmissionRecord> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestEmissionRecord[]>): HttpResponse<IEmissionRecord[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
