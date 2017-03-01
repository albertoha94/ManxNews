import { Modal } from 'angular2-modal/plugins/bootstrap';
import { LanguageService } from './../language.service';
import { Language } from './../language.model';
import { Overlay } from 'angular2-modal';
import { Component, Input, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-language-item',
  templateUrl: './language-item.component.html',
  styleUrls: ['./language-item.component.css']
})
export class LanguageItemComponent {

  //-- Variables ---------------------------------------------------------------------------------/
  @Input()
  inLanguage: Language;

  //-- Consctructor ------------------------------------------------------------------------------/
  constructor(
    private oLanguageService: LanguageService,
    overlay: Overlay,
    vcRef: ViewContainerRef,
    public oModal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  //-- Methods -----------------------------------------------------------------------------------/

  /**
   * Llama al servicio de editar lenguaje con la info que tiene.
   */
  onEdit() {
    //console.log("Editando componente");
    //console.log(this.inLanguage);
    this.oLanguageService.editLanguage(this.inLanguage);
  }

  /**
   * Muestra un dialogo para confirmar la eliminacion del lenguaje, lo desactiva en la base de datos
   * y lo borra en el arreglo.
   */
  onDelete() {
    //TODO: FALTA que se cheque si el lenguaje esta en uso, de ser asi, no puede ser desactivado.

    //console.log("Eliminando lenguaje");
    this.oModal.confirm()
      .title('¿Desactivar ' + this.inLanguage._title + '(' + this.inLanguage._abv + ')?')
      .body('Esta acción no se puede deshacer')
      .okBtn('Desactivar')
      .cancelBtn('Cancelar')
      .open()
      .catch(err => alert("ERROR: No se pudo crear el modal.")) //-- Catch error not related to the result (modal open)
      .then(dialog => dialog.result) // dialog has more properties,lets just return the promise for a result. 
      .then(result => {             //-- Si se presiono el ok.
        //console.log('Desactivación de lenguaje ' + this.inLanguage._title + ' comenzada.');
        this.oLanguageService.deleteLanguage(this.inLanguage).subscribe(
          oResult => console.log(oResult),
          oError => console.error(oError)
        );
      })
      .catch(err => {               //-- If were here it was cancelled (click or non block click)
        console.log('Desactivación de lenguaje ' + this.inLanguage._title + ' cancelada.');
      });
  }
}