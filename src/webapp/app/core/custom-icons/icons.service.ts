import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class IconsService {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {}

  public registerSvgIcons(): void {
    this.matIconRegistry.addSvgIcon('box', this.domSanitizer.bypassSecurityTrustResourceUrl('/content/icons/box.svg'));
    this.matIconRegistry.addSvgIcon('article', this.domSanitizer.bypassSecurityTrustResourceUrl('/content/icons/article.svg'));
    this.matIconRegistry.addSvgIcon('summarize', this.domSanitizer.bypassSecurityTrustResourceUrl('/content/icons/summarize.svg'));
  }
}
