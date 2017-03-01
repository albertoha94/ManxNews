
var express = require('express');
var router = express.Router();
var App = require('../models/appdb')

/**
 * Ruta usada cuando se debe de eliminar una app.
 */
router.patch('/deleteApp/:id', function(oReq, oRes, oNext) {
    App.findById(oReq.params.id, function (oError, oApp) {

        //-- Error conectando
        if (oError) {
            return oRes.status(500).json({
                title: 'An error occurred',
                error: oError
            });
        }

        //-- Conectado pero no se encontro app
        if (!oApp) {
            return oRes.status(500).json({
                title: 'No App Found!',
                error: { message: 'App not found' }
            });
        }

        //-- App encontrada
        oApp.active = false;
        oApp.date_delete =  new Date();
        oApp.date_lastchange = new Date();
        oApp.save(function (oErrorSaving, oResult) {
            if (oErrorSaving) {
                return oRes.status(500).json({
                    title: 'An error occurred',
                    error: oErrorSaving
                });
            }
            oRes.status(200).json({
                message: 'App eliminado',
                obj: oResult
            });
        });
    });
});

/**
 * Ruta usada cuando se debe de actualizar una app.
 */
router.patch('/updateApp/:id', function(oReq, oRes, oNext) {
    App.findById(oReq.params.id, function (oError, oApp) {

        //-- Error conectando
        if (oError) {
            return oRes.status(500).json({
                title: 'An error occurred',
                error: oError
            });
        }

        //-- Conectado pero no se encontro lenguaje
        if (!oApp) {
            return oRes.status(500).json({
                title: 'No App Found!',
                error: { message: 'App not found' }
            });
        }

        //-- App encontrada
        oApp.title = oReq.body._title;
        oApp.languageId= oReq.body._languageId;
        oApp.platformId= oReq.body._platformId;
        oApp.date_update =  new Date();
        oApp.date_lastchange = new Date();
        oApp.save(function (oErrorSaving, oResult) {
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
router.get('/getApps', function (req, res, next) {
    App.find({ "active": true })
        .exec(function (err, oApps) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }

            //-- Regresa todo.
            res.status(200).json({
                message: 'Success',
                obj: oApps
            });
        });
});

/**
 * /db/addApp
 * Ruta usada para agregar una app.
 */
router.post('/addApp', function (oReq, oRes, oNext) {

    //-- Obteniendo la app.
    const app = new App({
        title: oReq.body._title,
        languageId: oReq.body._languageId,
        platformId: oReq.body._platformId,
        active: true,
        date_creation: new Date(),
        date_lastchange: new Date()
    });

    //-- Guardando el lenguaje.
    app.save(function (oError, oResult) {

        //-- En caso de error.
        if (oError) {
            return oRes.status(500).json({
                title: 'An error occurred',
                error: oError
            });
        }

        //-- Mensaje guardado sucesivamente.
        oRes.status(201).json({
            message: 'App agregada',
            obj: oResult
        });
        //console.log(oRes);
    });
});

module.exports = router;