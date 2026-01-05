import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { EmissionRecordDetailComponent } from './emission-record-detail.component';

describe('EmissionRecord Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmissionRecordDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: EmissionRecordDetailComponent,
              resolve: { emissionRecord: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(EmissionRecordDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load emissionRecord on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', EmissionRecordDetailComponent);

      // THEN
      expect(instance.emissionRecord).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
