
/**
 * Clase usada como modelo para almacenar las aplicaciones manejadas en la app.
 */
export class App {

    constructor(
        public _title: String,
        public _languageId: String,
        public _platformId: String,
        public _id?: String, 
        ) { }
}