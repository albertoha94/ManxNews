import { Language } from './../language.model';
import { LanguageService } from './../language.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";


@Component({
  selector: 'language-input',
  templateUrl: './language-input.component.html',
  styleUrls: ['./language-input.component.css']
})

/**
 * Se encarga de la creacion de lenguajes. Maneja la info dentro de la forma, la valida y la envia 
 * por un servicio con onSubmit.
 */
export class LanguageInputComponent implements OnInit {

  //-- Variables ---------------------------------------------------------------------------------/
  _language: Language;
  _formLanguage: FormGroup;

  //-- Constructor -------------------------------------------------------------------------------/
  constructor(private oLanguageService: LanguageService) { }

  //-- Overrided methods -------------------------------------------------------------------------/
  ngOnInit() {

    //--Validadores para la forma.
    this._formLanguage = new FormGroup({
      lang_name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(30)
      ]),
      lang_abv: new FormControl(null, [
        Validators.required,
        Validators.maxLength(2),
        Validators.minLength(2)
      ])
    });

    //-- Suscrito al evento de editar mensaje.
    this.oLanguageService.languageIsEdit.subscribe(
      (oLanguage: Language) => this._language = oLanguage
    );
  }

  //-- Methods -----------------------------------------------------------------------------------/

  /**
   *  Llama al servicio para editar o agregar un lenguaje y lo subscribe para
   *  su resultado.
   */
  onSubmit() {

    //-- Si el objeto existe, estamos editando.
    //console.log(this._language);
    if (this._language) {
      //console.log("Editando lenguaje");

      this._language._title = this._formLanguage.value.lang_name;
      this._language._abv = this._formLanguage.value.lang_abv;
      this.oLanguageService.updateLanguage(this._language)
        .subscribe(
          oResult => console.log(oResult),
          oError => console.error(oError)
        );

    } else {
      //console.log("Nuevo lenguaje");

      //-- Si no, es nuevo.
      const language = new Language(
        this._formLanguage.value.lang_name,
        this._formLanguage.value.lang_abv
      );
      //console.log(language);
      this.oLanguageService.addLanguage(language)
        .subscribe(
          oResult => console.log(oResult),
          oError => console.error(oError)
        );
    }

    //-- Limpiando todo.
    this.onClear();
  }

  /**
   * Limpia los campos usados para agregar/editar un lenguaje.
   */
  onClear() {
    this._language = null;
    this._formLanguage.reset();
  }
}