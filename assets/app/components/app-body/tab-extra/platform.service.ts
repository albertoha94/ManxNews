import { Platform } from './platform.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class PlatformService {

    //-- Variables -------------------------------------------------------------------------------/
    private _platformList: Platform[];
    platformIsEdit = new EventEmitter<Platform>();

    //-- Constructor -----------------------------------------------------------------------------/
    constructor(private oHttp: Http) { }

    //-- Methods ---------------------------------------------------------------------------------/

    /**
     * Elimina una plataforma en el arreglo de plataformas dentro de la app y en la base de datos.
     * @param oPlatform     Objeto plataforma que se va a elimina.
     */
    deletePlatform(oPlatform: Platform) {
        this._platformList.splice(this._platformList.indexOf(oPlatform), 1);
        const body = JSON.stringify(oPlatform);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.oHttp.patch('http://192.168.1.11:3000/db/deletePlatform/' + oPlatform._id, body, { headers: headers })
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: Response) => Observable.throw(error.json));
    }

    /**
     * Obtiene todos las plataformas que se encuentran almacenados en al base de datos y los regresa 
     * en un arreglo.
     */
    getPlatforms() {
        return this.oHttp.get('http://192.168.1.11:3000/db/getPlatform')
            .map((oResponse: Response) => {
                const oPlatformList = oResponse.json().obj;
                let transformedPlatforms: Platform[] = [];
                for (let platform of oPlatformList) {
                    const d = new Platform(platform.title, platform._id);
                    transformedPlatforms.push(d);
                }
                this._platformList = transformedPlatforms;
                return transformedPlatforms;
            })
            .catch((error: Response) => Observable.throw(error.json));
    }
    
    /**
     * Agrega una plataforma en el arreglo de plataformas dentro de la app y en la base de datos.
     * @param oPlatform     Objeto lenguaje que se va a agregar.
     */
    addPlatform(oPlatform: Platform) {
        const body = JSON.stringify(oPlatform);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.oHttp.post('http://192.168.1.11:3000/db/addPlatform', body, { headers: headers })
            .map((response: Response) => {
                const result = response.json();
                const platform = new Platform(result.obj.title, result.obj._id);
                this._platformList.push(platform);
                return response.json();
            })
            .catch((error: Response) => Observable.throw(error.json));
    }

    /**
     * Emite un evento para desplegar la info de la plataforma en la forma.
     * @param oPlatform     Objeto plataforma que se va a agregar.
     */
    editPlatform(oPlatform: Platform) {
        this.platformIsEdit.emit(oPlatform);
    }

    /**
     * Actualiza una plataforma ya existente con nuevos datos.
     * @param oPlatform     La plataforma con los datos nuevos y con su identificador.
     */
    updatePlatform(oPlatform: Platform) {
        const body = JSON.stringify(oPlatform);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.oHttp.patch('http://192.168.1.11:3000/db/updatePlatform/' + oPlatform._id, body, { headers: headers })
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: Response) => Observable.throw(error.json));
    }
}