import { NewsService } from './tab-apps/news/news.service';
import { PlatformService } from './tab-extra/platform.service';
import { LanguageService } from './tab-extra/language.service';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../app-body/tab-apps/app.service'

@Component({
  selector: 'app-body',
  templateUrl: './app-body.component.html',
  styleUrls: ['./app-body.component.css'],
  providers: [
    LanguageService,
    PlatformService,
    AppService,
    NewsService
  ]
})

/**
 * Aqui se obtienen todos los servicios usados dentro de la app.
 */
export class AppBodyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}