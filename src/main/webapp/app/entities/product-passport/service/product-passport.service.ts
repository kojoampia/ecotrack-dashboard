import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProductPassport, NewProductPassport } from '../product-passport.model';

export type PartialUpdateProductPassport = Partial<IProductPassport> & Pick<IProductPassport, 'id'>;

type RestOf<T extends IProductPassport | NewProductPassport> = Omit<T, 'createdDate'> & {
  createdDate?: string | null;
};

export type RestProductPassport = RestOf<IProductPassport>;

export type NewRestProductPassport = RestOf<NewProductPassport>;

export type PartialUpdateRestProductPassport = RestOf<PartialUpdateProductPassport>;

export type EntityResponseType = HttpResponse<IProductPassport>;
export type EntityArrayResponseType = HttpResponse<IProductPassport[]>;

@Injectable({ providedIn: 'root' })
export class ProductPassportService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/product-passports');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(productPassport: NewProductPassport): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(productPassport);
    return this.http
      .post<RestProductPassport>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(productPassport: IProductPassport): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(productPassport);
    return this.http
      .put<RestProductPassport>(`${this.resourceUrl}/${this.getProductPassportIdentifier(productPassport)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(productPassport: PartialUpdateProductPassport): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(productPassport);
    return this.http
      .patch<RestProductPassport>(`${this.resourceUrl}/${this.getProductPassportIdentifier(productPassport)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestProductPassport>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestProductPassport[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getProductPassportIdentifier(productPassport: Pick<IProductPassport, 'id'>): number {
    return productPassport.id;
  }

  compareProductPassport(o1: Pick<IProductPassport, 'id'> | null, o2: Pick<IProductPassport, 'id'> | null): boolean {
    return o1 && o2 ? this.getProductPassportIdentifier(o1) === this.getProductPassportIdentifier(o2) : o1 === o2;
  }

  addProductPassportToCollectionIfMissing<Type extends Pick<IProductPassport, 'id'>>(
    productPassportCollection: Type[],
    ...productPassportsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const productPassports: Type[] = productPassportsToCheck.filter(isPresent);
    if (productPassports.length > 0) {
      const productPassportCollectionIdentifiers = productPassportCollection.map(
        productPassportItem => this.getProductPassportIdentifier(productPassportItem)!,
      );
      const productPassportsToAdd = productPassports.filter(productPassportItem => {
        const productPassportIdentifier = this.getProductPassportIdentifier(productPassportItem);
        if (productPassportCollectionIdentifiers.includes(productPassportIdentifier)) {
          return false;
        }
        productPassportCollectionIdentifiers.push(productPassportIdentifier);
        return true;
      });
      return [...productPassportsToAdd, ...productPassportCollection];
    }
    return productPassportCollection;
  }

  protected convertDateFromClient<T extends IProductPassport | NewProductPassport | PartialUpdateProductPassport>(
    productPassport: T,
  ): RestOf<T> {
    return {
      ...productPassport,
      createdDate: productPassport.createdDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restProductPassport: RestProductPassport): IProductPassport {
    return {
      ...restProductPassport,
      createdDate: restProductPassport.createdDate ? dayjs(restProductPassport.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestProductPassport>): HttpResponse<IProductPassport> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestProductPassport[]>): HttpResponse<IProductPassport[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
