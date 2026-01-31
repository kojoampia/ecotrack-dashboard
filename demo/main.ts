import { bootstrapApplication } from '@angular/platform-browser';
import { AppEcotrackDemoComponent } from './app-ecotrack-demo.component';

/**
 * Standalone Bootstrap for Demo Components
 * 
 * This file demonstrates how to bootstrap the refactored EcoTrack demo
 * components as a standalone Angular application.
 * 
 * Usage:
 * 1. Update angular.json to use this file as the main entry point
 * 2. Or import AppEcotrackDemoComponent in your existing app.module.ts
 */

bootstrapApplication(AppEcotrackDemoComponent, {
  providers: [
    // Add any required providers here
  ],
}).catch(err => console.error(err));
