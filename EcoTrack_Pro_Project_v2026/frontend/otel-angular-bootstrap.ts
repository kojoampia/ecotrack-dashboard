import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app.component';
import { OtelTelemetryService } from './app/services/otel-telemetry.service';

/**
 * Expert Setup: We initialize telemetry BEFORE the application
 * bootstraps to ensure the root span captures the initial load time.
 */
const otelService = new OtelTelemetryService();
otelService.initTelemetry();

bootstrapApplication(App, appConfig).catch(err => console.error(err));
