import { NewsItemComponent } from './components/app-body/tab-apps/news/news-item/news-item.component';
import { AppItemComponent } from './components/app-body/tab-apps/app-item/app-item.component';
import { NewsInputComponent } from './components/app-body/tab-apps/news/news-input/news-input.component';
import { AppsComponent } from './components/app-body/tab-apps/apps/apps.component';
import { AppTableComponent } from './components/app-body/tab-apps/app-table/app-table.component';
import { AppListComponent } from './components/app-body/tab-apps/app-list/app-list.component';
import { AppInputComponent } from './components/app-body/tab-apps/app-input/app-input.component';
import { PlatformTableComponent } from './components/app-body/tab-extra/platform-table/platform-table.component';
import { PlatformItemComponent } from './components/app-body/tab-extra/platform-item/platform-item.component';
import { PlatformInputComponent } from './components/app-body/tab-extra/platform-input/platform-input.component';
import { LanguageItemComponent } from './components/app-body/tab-extra/language-item/language-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LanguageTableComponent } from './components/app-body/tab-extra/language-table/language-table.component';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { LanguageInputComponent } from './components/app-body/tab-extra/language-input/language-input.component';
import { PlatformsComponent } from './components/app-body/tab-extra/platforms/platforms.component';
import { LanguagesComponent } from './components/app-body/tab-extra/languages/languages.component';
import { TabRecentComponent } from './components/app-body/tab-recent/tab-recent.component';
import { TabExtraComponent } from './components/app-body/tab-extra/tab-extra.component';
import { TabAppsComponent } from './components/app-body/tab-apps/tab-apps.component';
import { TabRoutes } from './app.routing';
import { AppBodyComponent } from './components/app-body/app-body.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from "./app.component";

@NgModule({
    declarations: [
        AppComponent,
        AppHeaderComponent,
        AppBodyComponent,
        TabAppsComponent,
        TabExtraComponent,
        TabRecentComponent,
        LanguagesComponent,
        LanguageInputComponent,
        LanguageTableComponent,
        LanguageItemComponent,
        PlatformsComponent,
        PlatformInputComponent,
        PlatformItemComponent,
        PlatformTableComponent,
        AppsComponent,
        AppInputComponent,
        AppListComponent,
        AppTableComponent,
        AppItemComponent,
        NewsInputComponent,
        NewsItemComponent
    ],
    imports: [
        BrowserModule,
        TabRoutes,
        ModalModule.forRoot(),
        BootstrapModalModule,
        HttpModule,
        ReactiveFormsModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}