import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditorPage } from '../../model/content-service/editor.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'eco-editor-page',
  templateUrl: './editor-page.component.html',
})
export class EditorPageComponent implements OnInit {
  public form: FormGroup;

  @Input() title?: string | undefined;
  @Input() content?: string | undefined;
  @Input() canDelete?: boolean;

  @Output() saved = new EventEmitter<EditorPage>();
  @Output() updated = new EventEmitter<EditorPage>();
  @Output() deleted = new EventEmitter<string>();
  @Output() canceled = new EventEmitter<void>();

  constructor(private languageService: TranslateService) {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl(''),
    });
  }

  public ngOnInit(): void {
    this.fillForm();
  }

  public submit(): void {
    if (this.form?.valid) {
      const page = {} as EditorPage;

      page.title = this.form?.get('title')?.value;
      page.content = this.form?.get('content')?.value;
      page.language = this.languageService.currentLang?.toUpperCase();
      if (this.canDelete) {
        this.updated.emit(page);
      } else this.saved.emit(page);
    }
  }

  public delete(): void {
    this.deleted.emit();
    this.form?.patchValue({
      title: '',
      content: '',
    });
  }

  public cancel(): void {
    this.canceled.emit();
  }

  private fillForm(): void {
    this.form?.patchValue({
      title: this.title,
      content: this.content,
    });
  }
}
