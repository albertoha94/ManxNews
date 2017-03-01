import { Platform } from './../platform.model';
import { PlatformService } from './../platform.service';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Overlay } from 'angular2-modal';
import { Component, Input, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-platform-item',
  templateUrl: './platform-item.component.html',
  styleUrls: ['./platform-item.component.css']
})
export class PlatformItemComponent {

  //-- Variables ---------------------------------------------------------------------------------/
  @Input()
  inPlatform: Platform;

  //-- Consctructor ------------------------------------------------------------------------------/
  constructor(
    private oPlatformService: PlatformService,
    overlay: Overlay,
    vcRef: ViewContainerRef,
    public oModal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  //-- Methods -----------------------------------------------------------------------------------/

  /**
   * Llama al servicio de editar plataforma con la info que tiene.
   */
  onEdit() {
    this.oPlatformService.editPlatform(this.inPlatform);
  }

  /**
   * Muestra un dialogo para confirmar la eliminacion de la plataforma, lo desactiva en la base de datos
   * y lo borra en el arreglo.
   */
  onDelete() {
    //TODO: FALTA que se cheque si la plataforma esta en uso, de ser asi, no puede ser desactivado.

    this.oModal.confirm()
      .title('¿Desactivar ' + this.inPlatform._title + '?')
      .body('Esta acción no se puede deshacer')
      .okBtn('Desactivar')
      .cancelBtn('Cancelar')
      .open()
      .catch(err => alert("ERROR: No se pudo crear el modal.")) //-- Catch error not related to the result (modal open)
      .then(dialog => dialog.result) // dialog has more properties,lets just return the promise for a result. 
      .then(result => {              //-- Si se presiono el ok.
        this.oPlatformService.deletePlatform(this.inPlatform).subscribe(
          oResult => console.log(oResult),
          oError => console.error(oError)
        );
      })
      .catch(err => {                //-- If were here it was cancelled (click or non block click)
        console.log('Desactivación de lenguaje ' + this.inPlatform._title + ' cancelada.');
      });
  }
}