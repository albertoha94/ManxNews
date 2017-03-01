import { PlatformService } from './../platform.service';
import { Platform } from './../platform.model';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'platform-input',
  templateUrl: './platform-input.component.html',
  styleUrls: ['./platform-input.component.css']
})

/**
 * Se encarga de la creacion de plataformas. Maneja la info dentro de la forma, la valida y la envia 
 * por un servicio con onSubmit.
 */
export class PlatformInputComponent implements OnInit {

  //-- Variables ---------------------------------------------------------------------------------/
  _platform: Platform;
  _formPlatform: FormGroup;

  //-- Constructor -------------------------------------------------------------------------------/
  constructor(private oPlatformService: PlatformService) { }

  //-- Overrided methods -------------------------------------------------------------------------/
  ngOnInit() {

    //--Validadores para la forma.
    //TODO: Hacer que el icono no exceda los 64x64.
    //TODO: Volver a implementar los iconos mas adelante.
    this._formPlatform = new FormGroup({
      plat_name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(30)
      ])
    });

    //-- Suscrito al evento de editar plataforma.
    this.oPlatformService.platformIsEdit.subscribe(
      (oPlatform: Platform) => this._platform = oPlatform
    );
  }

  //-- Methods -----------------------------------------------------------------------------------/

  /**
   *  Llama al servicio para editar o agregar una plataforma y lo subscribe para
   *  su resultado.
   */
  onSubmit() {

    //-- Si el objeto existe, estamos editando.
    if (this._platform) {
      this._platform._title = this._formPlatform.value.plat_name;
      this.oPlatformService.updatePlatform(this._platform)
        .subscribe(
        oResult => console.log(oResult),
        oError => console.error(oError)
        );

    } else {

      //-- Si no, es nuevo.
      const platform = new Platform(
        this._formPlatform.value.plat_name,
      );
      this.oPlatformService.addPlatform(platform)
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
    this._platform = null;
    this._formPlatform.reset();
  }
}