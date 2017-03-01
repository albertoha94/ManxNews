var Language = require('../models/language');
var express = require('express');
var router = express.Router();

/**
 * Ruta usada cuando se debe de eliminar un lenguaje.
 */
router.patch('/deleteLanguage/:id', function(oReq, oRes, oNext) {
    Language.findById(oReq.params.id, function (oError, oLanguage) {

        //-- Error conectando
        if (oError) {
            return oRes.status(500).json({
                title: 'An error occurred',
                error: oError
            });
        }

        //-- Conectado pero no se encontro lenguaje
        if (!oLanguage) {
            return oRes.status(500).json({
                title: 'No Languages Found!',
                error: { message: 'Languages not found' }
            });
        }

        //-- Lenguaje encontrado
        oLanguage.active = false;
        oLanguage.date_delete =  new Date();
        oLanguage.date_lastchange = new Date();
        //console.log("Lenguaje a guardar");
        //console.log(oLanguage);
        oLanguage.save(function (oErrorSaving, oResult) {
            if (oErrorSaving) {
                return oRes.status(500).json({
                    title: 'An error occurred',
                    error: oErrorSaving
                });
            }
            oRes.status(200).json({
                message: 'Lenguaje eliminado',
                obj: oResult
            });
        });
    });
});

/**
 * Ruta usada cuando se debe de actualizar un lenguaje.
 */
router.patch('/updateLanguage/:id', function(oReq, oRes, oNext) {
    Language.findById(oReq.params.id, function (oError, oLanguage) {

        //-- Error conectando
        if (oError) {
            return oRes.status(500).json({
                title: 'An error occurred',
                error: oError
            });
        }

        //-- Conectado pero no se encontro lenguaje
        if (!oLanguage) {
            return oRes.status(500).json({
                title: 'No Languages Found!',
                error: { message: 'Languages not found' }
            });
        }

        //-- Lenguaje encontrado
        oLanguage.title = oReq.body._title;
        oLanguage.abbreviation = oReq.body._abv;
        oLanguage.date_update =  new Date();
        oLanguage.date_lastchange = new Date();
        oLanguage.save(function (oErrorSaving, oResult) {
            if (oErrorSaving) {
                return oRes.status(500).json({
                    title: 'An error occurred',
                    error: oErrorSaving
                });
            }
            oRes.status(200).json({
                message: 'Updated Languages',
                obj: oResult
            });
        });
    });
});

/**
 * Obtiene todos los lenguajes guardados en la base de datos.
 */
router.get('/getLanguage', function (req, res, next) {
    Language.find({ "active": true })
        .exec(function (err, oLanguages) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            //console.log(oLanguages);
            res.status(200).json({
                message: 'Success',
                obj: oLanguages
            });
        });
});

/**
 * /db/addLanguage
 * Ruta usada para agregar lenguajes.
 */
router.post('/addLanguage', function (oReq, oRes, oNext) {
    //console.log("Entramos al post");

    //-- Obteniendo el lenguaje.
    const language = new Language({
        title: oReq.body._title,
        abbreviation: oReq.body._abv,
        active: true,
        date_creation: new Date(),
        date_lastchange: new Date()
    });
    //console.log(language);

    //-- Guardando el lenguaje.
    language.save(function(oError, oResult) {

        //-- En caso de error.
        if (oError) {
            return oRes.status(500).json({
                title: 'An error occurred',
                error: oError
            });
        }

        //-- Mensaje guardado sucesivamente.
        oRes.status(201).json({
            message: 'Lenguaje agregado',
            obj: oResult
        });
    });
});

module.exports = router;