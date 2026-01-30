import { Component, OnInit } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';
import { SessionStorageService } from 'ngx-webstorage';
import { LANGUAGES } from '../../core/language/language.constants';

@Component({
  selector: 'eco-language-menu',
  templateUrl: './language-menu.component.html',
})
export class LanguageMenuComponent implements OnInit {
  public languages = LANGUAGES;
  public selectedLang!: string;

  constructor(private languageService: JhiLanguageService, private sessionStorage: SessionStorageService) {}

  public ngOnInit(): void {
    this.selectedLang = this.languageService.currentLang || sessionStorage.getItem('locale') || 'en';
  }

  changeLanguage(langKey: string): void {
    this.sessionStorage.store('locale', langKey);
    this.languageService.changeLanguage(langKey);
    this.selectedLang = langKey;
  }
}
