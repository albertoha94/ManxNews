import { App } from './../app.model';
import { Language } from './../../tab-extra/language.model';
import { LanguageService } from './../../tab-extra/language.service';
import { AppService } from './../app.service';
import { NewsService } from './../news/news.service';
import { News } from './../news/news.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.css']
})
export class AppTableComponent implements OnInit {

  //-- Variables ---------------------------------------------------------------------------------/
  _newsList: News[];
  _languageList: Language[];
  _appList: App[];

  //-- Constructor -------------------------------------------------------------------------------/
  constructor(
    private oNewsService: NewsService,
    private oAppService: AppService,
    private oLanguageService: LanguageService
  ) { }

  //-- Metodos sobrecargados ---------------------------------------------------------------------/
  ngOnInit() {

    //-- Obteniendo noticias en bd.
    this.oNewsService.getNews()
      .subscribe(
      (oNewsList: News[]) => this._newsList = oNewsList
      );

    //-- Obteniendo lenguajes en bd.
    this.oLanguageService.getLanguages()
      .subscribe(
      (oLanguageList: Language[]) => this._languageList = oLanguageList
      );

    //-- Obteniendo apps en bd.
    this.oAppService.getApps()
      .subscribe(
      (oAppList: App[]) => this._appList = oAppList
      );
  }

  /**
   * Obtiene la aplicacion que tiene enlazada esta noticia.
   * @param   Objeto noticia del cual se saca la id de la app.
   * @returns Objeto app que concuerde con la id obtenida.
   */
  getApp(oNew: News) {
    if (this._appList == null) {
      return null;
    }

    return this._appList.filter(
      oItem => oItem._id == oNew._appId
    )[0];
  }

  /**
   * Obtiene el lenguaje que tiene enlazada esta noticia.
   * @param   Objeto noticia del cual se saca la id del lenguaje.
   * @returns Objeto Leguaje que concuerde con la id obtenida.
   */
  getLanguage(oNew: News) {
    if (this._languageList == null) {
      return null;
    }

    return this._languageList.filter(
      oItem => oItem._id == oNew._languageId
    )[0];
  }
}