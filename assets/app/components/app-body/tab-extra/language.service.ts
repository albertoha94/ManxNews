import { Language } from './language.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class LanguageService {

    //-- Variables -------------------------------------------------------------------------------/
    private _languageList: Language[];
    languageIsEdit = new EventEmitter<Language>();

    //-- Constructor -----------------------------------------------------------------------------/
    constructor(private oHttp: Http) { }

    //-- Methods ---------------------------------------------------------------------------------/

    /**
     * Elimins un lenguaje en el arreglo de lenguajes dentro de la app y en la base de datos.
     * @param oLanguage     Objeto lenguaje que se va a elimina.
     */
    deleteLanguage(oLanguage: Language) {
        this._languageList.splice(this._languageList.indexOf(oLanguage), 1);
        const body = JSON.stringify(oLanguage);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.oHttp.patch('http://192.168.1.11:3000/db/deleteLanguage/' + oLanguage._id, body, { headers: headers })
            .map((response: Response) => {
                return response.json();
                //console.log("Lista local");
                //console.log(this._languageList);
            })
            .catch((error: Response) => Observable.throw(error.json));
    }

    /**
     * Obtiene todos los lengaujes que se encuentran almacenados en al base de datos y los regresa 
     * en un arreglo.
     */
    getLanguages() {
        return this.oHttp.get('http://192.168.1.11:3000/db/getLanguage')
            .map((oResponse: Response) => {
                const oLanguageList = oResponse.json().obj;
                let transformedLanguages: Language[] = [];
                for (let language of oLanguageList) {
                    transformedLanguages.push(new Language(language.title, language.abbreviation, language._id));
                }
                this._languageList = transformedLanguages;
                //console.log(transformedLanguages);
                return transformedLanguages;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    /**
     * Agrega un lenguaje en el arreglo de lenguajes dentro de la app y en la base de datos.
     * @param oLanguage     Objeto lenguaje que se va a agregar.
     */
    addLanguage(oLanguage: Language) {
        const body = JSON.stringify(oLanguage);
        //console.log(body);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.oHttp.post('http://192.168.1.11:3000/db/addLanguage', body, { headers: headers })
            .map((response: Response) => {
                const result = response.json();
                const language = new Language(result.obj.title, result.obj.abbreviation, result.obj._id);
                this._languageList.push(language);
                //console.log("Lista local");
                //console.log(this._languageList);
                return response.json();
            })
            .catch((error: Response) => Observable.throw(error.json));
    }

    /**
     * Emite un evento para desplegar la info del mensaje en la forma.
     * @param oLanguage     Objeto lenguaje que se va a agregar.
     */
    editLanguage(oLanguage: Language) {
        this.languageIsEdit.emit(oLanguage);
    }

    /**
     * Actualiza un lenguaje ya existente con nuevos datos.
     * @param oLanguage     El lenguaje con los datos nuevos y con su identificador.
     */
    updateLanguage(oLanguage: Language) {
        const body = JSON.stringify(oLanguage);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.oHttp.patch('http://192.168.1.11:3000/db/updateLanguage/' + oLanguage._id, body, { headers: headers })
            .map((response: Response) => {
                return response.json();
                //console.log("Lista local");
                //console.log(this._languageList);
            })
            .catch((error: Response) => Observable.throw(error.json));
    }
}