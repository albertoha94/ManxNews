/**
 * Clase usada como modelo para almacenar las plataformas manejadas en la app.
 */
export class News {

    constructor(
        public _header : String,
        public _body : String,
        public _languageId : String,
        public _appId : String,
        public _published : Boolean,
        public _date_visible : Date,
        public _id?: String, 
        ) { }
}