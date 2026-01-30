import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { ActivateService } from './activate.service';

@Component({
  selector: 'eco-activate',
  templateUrl: './activate.component.html',
})
export class ActivateComponent implements OnInit {
  error = false;
  success = false;

  constructor(private activateService: ActivateService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(flatMap(params => this.activateService.get(params.key))).subscribe(
      () => (this.success = true),
      () => (this.error = true)
    );
  }

  login(): void {
    this.router.navigate(['/auth/login']);
  }
}
