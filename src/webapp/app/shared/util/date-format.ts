import { MatDateFormats } from '@angular/material/core';

export class DateFormat {
  public static getFormat(): MatDateFormats {
    return {
      parse: {
        dateInput: ['l', 'LL'],
      },
      display: {
        dateInput: 'L',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
      },
    };
  }

  // {provide: MAT_DATE_FORMATS, useValue: DateFormat.getFormat()}
}
