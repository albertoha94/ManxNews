import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Overlay } from 'angular2-modal';
import { Response } from '@angular/http';
import { NewsService } from './../news.service';
import { Language } from './../../../tab-extra/language.model';
import { App } from './../../app.model';
import { News } from './../news.model';
import { Component, Input, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent {

  //-- Variables ---------------------------------------------------------------------------------/
  @Input()
  inNew: News;
  @Input()
  inApp: App;
  @Input()
  inLanguage: Language;
  private _languageText: String;

  //-- Constructor -------------------------------------------------------------------------------/
  constructor(
    private oNewsService: NewsService,
    overlay: Overlay,
    vcRef: ViewContainerRef,
    public oModal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  //-- Methods -----------------------------------------------------------------------------------/

  /**
   * Genera un texto para el renglon de Lenguaje.
   * @returns El texto requerido en un formato presentable.
   */
  getLanguageName() {
    if (this.inLanguage == null) {
      return 'N/A'
    }

    return this.inLanguage._title + '(' + this.inLanguage._abv + ')';
  }

  /**
   * Genera un texto para el renglon de Lenguaje.
   * @returns El texto requerido en un formato presentable.
   */
  getAppName() {
    if (this.inApp == null) {
      return 'N/A'
    }

    return this.inApp._title + '(' + this.inApp._id + ')';
  }

  /**
   * Define que texto poner en el boton de publicar de acuerdo al valor de inNew._published.
   * @returns Regresa el texto que define el boton.
   */
  getPublishedName() {
    if (this.inNew == null) {
      return 'Publicar';
    }

    if (this.inNew._published) {
      return 'Despublicar';
    } else {
      return 'Publicar';
    }
  }

  /**
   * Cambia el estado de la publicación a nivel local y en la base de datos.
   */
  publish() {
    this.inNew._published = (!this.inNew._published);
    this.oNewsService.updateNews(this.inNew)
      .subscribe(
      oResult => console.log(oResult),
      oError => console.error(oError)
      );
  }

  /**
   * Cuando se este editando el objeto, se emite un evento para pasar la info al input.
   */
  onEdit() {
    this.oNewsService.editNews(this.inNew);
  }

  /**
   * Muestra un dialogo para confirmar la eliminacion de la plataforma, lo desactiva en la base de datos
   * y lo borra en el arreglo.
   */
  onDelete() {
    this.oModal.confirm()
      .title('¿Desactivar noticia ' + this.inNew._header + '?')
      .body('Esta acción no se puede deshacer')
      .okBtn('Desactivar')
      .cancelBtn('Cancelar')
      .open()
      .catch(err => alert("ERROR: No se pudo crear el modal.")) //-- Catch error not related to the result (modal open)
      .then(dialog => dialog.result) // dialog has more properties,lets just return the promise for a result. 
      .then(result => {              //-- Si se presiono el ok.
        this.oNewsService.deleteNews(this.inNew).subscribe(
          oResult => console.log(oResult),
          oError => console.error(oError)
        );
      })
      .catch(err => {                //-- If were here it was cancelled (click or non block click)
        console.log('Desactivación de lenguaje ' + this.inNew._header + ' cancelada.');
      });
  }
}