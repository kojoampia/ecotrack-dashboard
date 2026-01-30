import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../layouts/profiles/profile.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'eco-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss'],
})
export class AdminMenuComponent implements OnInit {
  public swaggerEnabled?: boolean;

  constructor(private profileService: ProfileService) {}

  public ngOnInit(): void {
    this.profileService
      .getProfileInfo()
      .pipe(first())
      .subscribe(profileInfo => {
        this.swaggerEnabled = profileInfo.swaggerEnabled;
      });
  }
}
