import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Overlay } from 'angular2-modal';
import { AppService } from './../app.service';
import { App } from './../app.model';
import { Component, Input, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-app-item',
  templateUrl: './app-item.component.html',
  styleUrls: ['./app-item.component.css']
})
export class AppItemComponent {

  //-- Variables ---------------------------------------------------------------------------------/
  @Input()
  inApp: App;

  //-- Constructor -------------------------------------------------------------------------------/
  constructor(
    private oAppService: AppService,
    overlay: Overlay,
    vcRef: ViewContainerRef,
    public oModal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  //-- Methods -----------------------------------------------------------------------------------/

  /**
   * Llama al servicio de editar app con la info que tiene.
   */
  onEdit() {
    this.oAppService.editApp(this.inApp);
  }

  /**
   * Muestra un dialogo para confirmar la eliminacion de la app, lo desactiva en la base de datos
   * y lo borra en el arreglo.
   */
  onDelete() {
    //TODO: FALTA que se cheque si el lenguaje esta en uso, de ser asi, no puede ser desactivado.

    //console.log("Eliminando lenguaje");
    this.oModal.confirm()
      .title('¿Desactivar ' + this.inApp._title + '?')
      .body('Esta acción no se puede deshacer')
      .okBtn('Desactivar')
      .cancelBtn('Cancelar')
      .open()
      .catch(err => alert("ERROR: No se pudo crear el modal.")) //-- Catch error not related to the result (modal open)
      .then(dialog => dialog.result) // dialog has more properties,lets just return the promise for a result. 
      .then(result => {             //-- Si se presiono el ok.
        //console.log('Desactivación de lenguaje ' + this.inLanguage._title + ' comenzada.');
        this.oAppService.deleteApp(this.inApp).subscribe(
          oResult => console.log(oResult),
          oError => console.error(oError)
        );
      })
      .catch(err => {               //-- If were here it was cancelled (click or non block click)
        console.log('Desactivación de lenguaje ' + this.inApp._title + ' cancelada.');
      });
  }
}