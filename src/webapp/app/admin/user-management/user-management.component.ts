import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, combineLatest } from 'rxjs';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.model';
import { UserManagementDeleteDialogComponent } from './user-management-delete-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from 'app/core/user/user.model';

@Component({
  selector: 'eco-user-mgmt',
  templateUrl: './user-management.component.html',
})
export class UserManagementComponent implements OnInit, OnDestroy, AfterViewInit {
  currentAccount: Account | null = null;
  users: User[] | null = null;
  userListSubscription?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  eventSubscriber?: Subscription;
  public filter = '';

  public displayColumns = ['email', 'langKey', 'profiles', 'createdDate', 'lastModifiedBy', 'lastModifiedDate', 'actions'];

  public dataSource = new MatTableDataSource<User>();

  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(
    private userService: UserService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private eventManager: JhiEventManager,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => (this.currentAccount = account));
    this.userListSubscription = this.eventManager.subscribe('userListModification', () => this.loadAll());
    this.handleNavigation();
  }

  ngOnDestroy(): void {
    if (this.userListSubscription) {
      this.eventManager.destroy(this.userListSubscription);
    }
  }

  setActive(user: User, isActivated: boolean): void {
    this.userService.update({ ...user, activated: isActivated }).subscribe(() => this.loadAll());
  }

  toggle(elem: User): void {
    elem.activated = !elem.activated;
    this.setActive(elem, elem.activated);
  }

  trackIdentity(index: number, item: User): any {
    return item.id;
  }

  deleteUser(user: User): void {
    const modalRef = this.modalService.open(UserManagementDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.user = user;
  }

  transition(): void {
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {
        page: this.page,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
      },
    });
  }

  private handleNavigation(): void {
    combineLatest(this.activatedRoute.data, this.activatedRoute.queryParamMap, (data: Data, params: ParamMap) => {
      const page = params.get('page');
      this.page = page !== null ? +page : 1;
      const sort = (params.get('sort') ?? data['defaultSort']).split(',');
      this.predicate = sort[0];
      this.ascending = sort[1] === 'asc';
      this.loadAll();
    }).subscribe();
  }

  private loadAll(): void {
    this.userService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.createSort(),
      })
      .subscribe((res: HttpResponse<User[]>) => this.onSuccess(res.body, res.headers));
  }

  private createSort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  private onSuccess(users: IUser[] | null, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.users = users;
    this.dataSource.data = users || [];
  }

  delete(insurance: IUser): void {
    const modalRef = this.modalService.open(UserManagementDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.insurance = insurance;
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  /* Filter's Table according to input entered */
  public doFilter = (target: any): void => {
    const value = target.value;
    if (value == null) {
      this.clearFilter();
    } else {
      this.dataSource.filter = value.trim().toLocaleLowerCase();
    }
  };

  /* Clear filter and reset Table */
  public clearFilter(): void {
    this.dataSource.filter = '';
    this.filter = '';
  }
}
