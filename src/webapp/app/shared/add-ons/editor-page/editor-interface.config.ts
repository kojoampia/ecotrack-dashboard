import { InjectionToken } from '@angular/core';

export const EDITOR_CONFIG = new InjectionToken<EditorConfig>('EDITOR_CONFIG');

export interface EditorConfig {
  title?: string;
}
