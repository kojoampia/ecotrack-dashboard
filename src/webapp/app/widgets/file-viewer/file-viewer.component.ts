import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ECO_DASHBOARD_URL } from '../../app.constants';

@Component({
  selector: 'eco-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss'],
})
export class FileViewerComponent implements OnInit, OnDestroy {
  url?: string;
  title?: string;
  safeUrl?: SafeHtml;
  private destroyed$ = new Subject<boolean>();

  constructor(private sanitizer: DomSanitizer, private modal: MatDialog) {}

  ngOnInit(): void {
    if (this.url) {
      const resourceUrl = ECO_DASHBOARD_URL ? ECO_DASHBOARD_URL.concat('/' + this.url) : this.url;
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(resourceUrl);
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

  close(): void {
    this.modal.closeAll();
  }
}
