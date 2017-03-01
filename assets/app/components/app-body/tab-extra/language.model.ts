/**
 * Clase usada como modelo para almacenar los lenguajes manejados en la app.
 */
export class Language {

    constructor(
        public _title: String,
        public _abv: String,
        public _id?: String, 
        ) { }
}