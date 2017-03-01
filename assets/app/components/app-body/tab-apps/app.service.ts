import { Headers, Http, Response } from '@angular/http';
import { App } from './app.model';
import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {

    //-- Variables -----------------------------------------------------------------------------------/
    private _appList : App[] = [ ];
    appIsEdit = new EventEmitter<App>();

    //-- Constructor ---------------------------------------------------------------------------------/
    constructor(private oHttp: Http) { }

    //-- Methods -------------------------------------------------------------------------------------/

    /**
     * Emite un evento para desplegar la info de la app en la forma.
     * @param oApp     Objeto app que se va a agregar.
     */
    editApp(oApp: App) {
        this.appIsEdit.emit(oApp);
    }

    /**
     * Elimins un lenguaje en el arreglo de lenguajes dentro de la app y en la base de datos.
     * @param oLanguage     Objeto lenguaje que se va a elimina.
     */
    deleteApp(oApp: App) {
        this._appList.splice(this._appList.indexOf(oApp), 1);
        const body = JSON.stringify(oApp);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.oHttp.patch('http://localhost:3000/db/deleteApp/' + oApp._id, body, { headers: headers })
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: Response) => Observable.throw(error.json));
    }

    /**
     * Actualiza una app ya existente con nuevos datos.
     * @param oApp     La app con los datos nuevos y con su identificador.
     */
    updateApp(oApp: App) {
        const body = JSON.stringify(oApp);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.oHttp.patch('http://localhost:3000/db/updateApp/' + oApp._id, body, { headers: headers })
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: Response) => Observable.throw(error.json));
    }

    /**
     * Agrega una app en el arreglo de apps y en la base de datos.
     * @param oApp     Objeto app que se va a agregar.
     */
    addApp(oApp: App) {
        const body = JSON.stringify(oApp);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.oHttp.post('http://localhost:3000/db/addApp', body, { headers: headers })
            .map((response: Response) => {
                const result = response.json();
                const app = new App(result.obj.title, result.obj.languageId, result.obj.platformId, result.obj._id);
                this._appList.push(app);
                return result;
            })
            .catch((error: Response) => Observable.throw(error.json));
    }

    /**
     * Obtiene todas las apps que se encuentran almacenados en la base de datos y los regresa 
     * en un arreglo.
     */
    getApps() {
        return this.oHttp.get('http://localhost:3000/db/getApps')
            .map((oResponse: Response) => {
                const oAppList = oResponse.json().obj;
                let transformedApp: App[] = [];
                for (let app of oAppList) {
                    transformedApp.push(new App(app.title, app.languageId, app.platformId, app._id));
                }
                this._appList = transformedApp;
                //console.log(this._appList);
                return transformedApp;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
}