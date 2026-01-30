import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from 'app/core/user/user.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'eco-user-mgmt-detail',
  templateUrl: './user-management-detail.component.html',
})
export class UserManagementDetailComponent implements OnInit {
  user: User | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.pipe(first()).subscribe(({ user }) => (this.user = user));
  }

  previousState(): void {
    window.history.back();
  }
}
