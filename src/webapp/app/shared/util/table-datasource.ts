import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { TableData } from '../model/table-data';

export class TableDataSource extends DataSource<any> {
  private dataSubject = new BehaviorSubject<any[]>([]);
  private _length = 0;

  constructor() {
    super();
  }

  public get length(): number {
    return this._length;
  }

  public connect(): Observable<any[]> {
    return this.dataSubject.asObservable();
  }

  public disconnect(): void {
    this.dataSubject.complete();
  }

  public update(tableData: TableData): void {
    this._length = tableData.totalCount;
    this.dataSubject.next(tableData.entries);
  }
}
