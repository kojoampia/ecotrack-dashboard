import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private spinnerRef!: OverlayRef;

  constructor(private overlay: Overlay) {}

  private cdkSpinnerCreate(): OverlayRef {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'app-backdrop',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
    });
  }

  show(): void {
    if (this.spinnerRef) {
      this.spinnerRef.detach();
    }
    this.spinnerRef = this.cdkSpinnerCreate();
    this.spinnerRef.attach(new ComponentPortal(MatSpinner));
  }

  hide(): void {
    if (this.spinnerRef?.hasAttached()) {
      this.spinnerRef.detach();
    }
  }
}
