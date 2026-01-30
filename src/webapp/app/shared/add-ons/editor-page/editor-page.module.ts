import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorPageComponent } from './editor-page.component';
import { QuillModule } from 'ngx-quill';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [EditorPageComponent],
  imports: [
    // RouterModule.forChild([{ path: '', component: EditorPageComponent }]),
    CommonModule,
    QuillModule,
    TranslateModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatMenuModule,
    MatSelectModule,
  ],
  exports: [EditorPageComponent],
})
export class EditorPageModule {}
