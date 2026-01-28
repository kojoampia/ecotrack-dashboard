import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbonDashboardComponent } from './carbon-dashboard.component';

describe('CarbonDashboardComponent', () => {
  let component: CarbonDashboardComponent;
  let fixture: ComponentFixture<CarbonDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CarbonDashboardComponent],
    });
    fixture = TestBed.createComponent(CarbonDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
