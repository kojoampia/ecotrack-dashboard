import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { AdminDashboardSharedModule } from 'app/shared/shared.module';
import { AdminDashboardCoreModule } from 'app/core/core.module';
import { AdminDashboardAppRoutingModule } from './app-routing.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageCoreModule } from './shared/page-core.module';
import { QuillModule } from 'ngx-quill';
import { NgxStarsModule } from 'ngx-stars';
import { ToastModule } from './shared/services/toast/toast.module';
import { ChatBotModule } from './widgets/chat/chat-bot.module';

@NgModule({
  imports: [
    BrowserModule,
    AdminDashboardSharedModule,
    AdminDashboardCoreModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    AdminDashboardAppRoutingModule,
    BrowserAnimationsModule,
    PageCoreModule,
    ToastModule,
    NgxStarsModule,
    ChatBotModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],

          [{ header: 1 }, { header: 2 }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ direction: 'rtl' }],

          [{ size: ['small', false, 'large', 'huge'] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],

          ['clean'],

          ['link', 'image', 'video'],
        ],
      },
    }),
    // ChatBotModule,
  ],
  declarations: [MainComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  exports: [FooterComponent],
  bootstrap: [MainComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminDashboardAppModule {}
