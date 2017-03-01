import { Observable } from 'rxjs';
import { Http, Headers, Response } from '@angular/http';
import { News } from './news.model';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class NewsService {

    //-- Variables -----------------------------------------------------------------------------------/
    private _newsList: News[] = [];
    newIsEdit = new EventEmitter<News>();

    //-- Constructor ---------------------------------------------------------------------------------/
    constructor(private oHttp: Http) { }

    //-- Methods -------------------------------------------------------------------------------------/

    /**
     * Emite un evento para desplegar la info de la noticia en la forma.
     * @param oNew     Objeto noticia que se va a agregar.
     */
    editNews(oNew: News) {
        this.newIsEdit.emit(oNew);
    }

    /**
     * Elimina una noticia en el arreglo de noticias dentro de la app y en la base de datos.
     * @param oNew     Objeto noticia que se va a elimina.
     */
    deleteNews(oNew: News) {

        //-- Borrandolo del areglo.
        this._newsList.splice(this._newsList.indexOf(oNew), 1);

        //-- Desactivandolo de la base de datos.
        const body = JSON.stringify(oNew);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.oHttp.patch('http://localhost:3000/db/deleteNews/' + oNew._id, body, { headers: headers })
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: Response) => Observable.throw(error.json));
    }

    /**
     * Actualiza una noticia ya existente con nuevos datos.
     * @param oNew     La noticia con los datos nuevos y con su identificador.
     */
    updateNews(oNew: News) {
        const body = JSON.stringify(oNew);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.oHttp.patch('http://localhost:3000/db/updateNews/' + oNew._id, body, { headers: headers })
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: Response) => Observable.throw(error.json));
    }

    /**
     * Agrega una noticia en el arreglo de noticias y en la base de datos.
     * @param oNew     Objeto noticia que se va a agregar.
     */
    addNews(oNew: News) {
        const body = JSON.stringify(oNew);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.oHttp.post('http://localhost:3000/db/addNews', body, { headers: headers })
            .map((response: Response) => {
                const result = response.json();
                const news = new News(result.obj.header, result.obj.body, result.obj.languageId,
                    result.obj.appId, result.obj.published, result.obj.date_visible,
                    result.obj._id);
                this._newsList.push(news);
                return result;
            })
            .catch((error: Response) => Observable.throw(error.json));
    }

    /**
     * Obtiene todas las noticias que se encuentran almacenados en la base de datos y los regresa 
     * en un arreglo.
     */
    getNews() {
        return this.oHttp.get('http://localhost:3000/db/getNews')
            .map((oResponse: Response) => {
                const oNewsList = oResponse.json().obj;
                let transformedNews: News[] = [];
                for (let news of oNewsList) {
                    transformedNews.push(new News(news.header, news.body, news.languageId,
                        news.appId, news.published, news.date_visible,
                        news._id));
                }
                this._newsList = transformedNews;
                //console.log(this._appList);
                return transformedNews;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
}