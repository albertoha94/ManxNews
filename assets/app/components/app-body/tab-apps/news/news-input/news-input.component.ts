import { NewsService } from './../news.service';
import { AppService } from './../../app.service';
import { LanguageService } from './../../../tab-extra/language.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { App } from './../../app.model';
import { Language } from './../../../tab-extra/language.model';
import { News } from './../news.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-input',
  templateUrl: './news-input.component.html',
  styleUrls: ['./news-input.component.css']
})
export class NewsInputComponent implements OnInit {

  //-- Variables ---------------------------------------------------------------------------------/
  _new: News;
  _languageList: Language[];
  _appList: App[];
  _formNew: FormGroup;

  //-- Constructor -------------------------------------------------------------------------------/
  constructor(
    private oLanguageService: LanguageService,
    private oAppService: AppService,
    private oNewsService: NewsService
  ) { }

  //-- Overrided methods -------------------------------------------------------------------------/
  ngOnInit() {
    //--Validadores para la forma.
    this._formNew = new FormGroup({
      news_header: new FormControl(null, [
        Validators.required,
        Validators.maxLength(30)
      ]),
      new_app: new FormControl(null, [
        Validators.required
      ]),
      new_lang: new FormControl(null, [
        Validators.required
      ]),
      new_content: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200)
      ])
    });

    //-- Llenando la lista de lenguajes.
    this.oLanguageService.getLanguages().subscribe(
      (oLanguagesList: Language[]) => {
        this._languageList = oLanguagesList;
      }
    );

    //-- Llenando la lista de apps.
    this.oAppService.getApps().subscribe(
      (oAppList: App[]) => {
        //console.log(oAppList);
        this._appList = oAppList;
      }
    );

    //-- Suscrito al evento de editar mensaje.
    this.oNewsService.newIsEdit.subscribe(
      (oNew: News) => this._new = oNew
    );
  }

  //-- Methods -----------------------------------------------------------------------------------/

  /**
   *  Llama al servicio para editar o agregar una noticia y lo subscribe para su resultado.
   */
  onSubmit() {

    //-- Si el objeto existe, estamos editando.
    //console.log(this._new);
    if (this._new) {
      //console.log("Editando noticia");

      this._new._header = this._formNew.value.news_header;
      this._new._appId = this._formNew.value.new_app;
      this._new._languageId = this._formNew.value.new_lang;
      this._new._body = this._formNew.value.new_content;
      //console.log('Enviando');
      //console.log(this._app);
      this.oNewsService.updateNews(this._new)
        .subscribe(
        oResult => console.log(oResult),
        oError => console.error(oError)
        );

    } else {
      //console.log('Nueva noticia');

      //-- Si no, es nuevo.
      const news = new News(
        this._formNew.value.news_header,
        this._formNew.value.new_content,
        this._formNew.value.new_lang,
        this._formNew.value.new_app,
        false,
        new Date()
      );

      this.oNewsService.addNews(news)
        .subscribe(
        oResult => console.log(oResult),
        oError => console.error(oError)
        );
    }

    //-- Limpiando todo.
    this.onClear();
  }

  /**
   * Limpia los campos usados para agregar/editar una noticia.
   */
  onClear() {
    this._new = null;
    this._formNew.reset();
  }

}