import { AppService } from './../app.service';
import { PlatformService } from './../../tab-extra/platform.service';
import { Platform } from './../../tab-extra/platform.model';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { App } from './../app.model';
import { FormGroup } from '@angular/forms';
import { Language } from './../../tab-extra/language.model';
import { LanguageService } from './../../tab-extra/language.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-input',
  templateUrl: './app-input.component.html',
  styleUrls: ['./app-input.component.css']
})
export class AppInputComponent implements OnInit {

  //-- Variables ---------------------------------------------------------------------------------/
  _app: App;
  _languageList: Language[];
  _platformList: Platform[];
  _formApp: FormGroup;

  //-- Constructor -------------------------------------------------------------------------------/
  constructor(
    private oLanguageService: LanguageService,
    private oPlatformService: PlatformService,
    private oAppService: AppService
  ) { }

  //-- Overrided methods -------------------------------------------------------------------------/
  ngOnInit() {

    //--Validadores para la forma.
    this._formApp = new FormGroup({
      app_name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(30)
      ]),
      app_lang: new FormControl(null, [
        Validators.required
      ]),
      app_plat: new FormControl(null, [
        Validators.required
      ])
    });

    //-- Llenando la lista de lenguajes.
    this.oLanguageService.getLanguages().subscribe(
      (oLanguagesList: Language[]) => {
        this._languageList = oLanguagesList;
      }
    );

    //-- Llenando la lista de plataformas.
    this.oPlatformService.getPlatforms().subscribe(
      (oPlatformList: Platform[]) => {
        this._platformList = oPlatformList;
      }
    );

    //-- Suscrito al evento de editar mensaje.
    this.oAppService.appIsEdit.subscribe(
      (oApp: App) => this._app = oApp
    );
  }

  //-- Methods -----------------------------------------------------------------------------------/

  /**
   *  Llama al servicio para editar o agregar una app y lo subscribe para
   *  su resultado.
   */
  onSubmit() {

    //-- Si el objeto existe, estamos editando.
    //console.log(this._app);
    if (this._app) {
      console.log("Editando app");

      this._app._title = this._formApp.value.app_name;
      this._app._languageId = this._formApp.value.app_lang;
      this._app._platformId = this._formApp.value.app_plat;
      //console.log('Enviando');
      //console.log(this._app);
      this.oAppService.updateApp(this._app)
        .subscribe(
        oResult => console.log(oResult),
        oError => console.error(oError)
        );

    } else {
      console.log('Nueva app');

      //-- Si no, es nuevo.
      const app = new App(
        this._formApp.value.app_name,
        this._formApp.value.app_lang,
        this._formApp.value.app_plat
      );

      this.oAppService.addApp(app)
        .subscribe(
        oResult => console.log(oResult),
        oError => console.error(oError)
        );
    }

    //-- Limpiando todo.
    this.onClear();
  }

  /**
   * Limpia los campos usados para agregar/editar una app.
   */
  onClear() {
    this._app = null;
    this._formApp.reset();
  }
}