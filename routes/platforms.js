var Platform = require('../models/platformdb')
var express = require('express');
var router = express.Router();
var fs = require('fs');

/**
 * Ruta usada cuando se debe de eliminar una plataforma.
 */
router.patch('/deletePlatform/:id', function(oReq, oRes, oNext) {
    Platform.findById(oReq.params.id, function (oError, oPlatform) {

        //-- Error conectando
        if (oError) {
            return oRes.status(500).json({
                title: 'An error occurred',
                error: oError
            });
        }

        //-- Conectado pero no se encontro plataforma
        if (!oPlatform) {
            return oRes.status(500).json({
                title: 'No Platforms Found!',
                error: { message: 'Platform not found' }
            });
        }

        //-- Lenguaje encontrado
        oPlatform.active = false;
        oPlatform.date_delete =  new Date();
        oPlatform.date_lastchange = new Date();
        oPlatform.save(function (oErrorSaving, oResult) {
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
 * Ruta usada cuando se debe de actualizar una plataforma.
 */
router.patch('/updatePlatform/:id', function(oReq, oRes, oNext) {
    Platform.findById(oReq.params.id, function (oError, oPlatform) {

        //-- Error conectando
        if (oError) {
            return oRes.status(500).json({
                title: 'An error occurred',
                error: oError
            });
        }

        //-- Conectado pero no se encontro lenguaje
        if (!oPlatform) {
            return oRes.status(500).json({
                title: 'No Platform Found!',
                error: { message: 'Platform not found' }
            });
        }

        //-- Lenguaje encontrado
        oPlatform.title = oReq.body._title;
        oPlatform.date_update =  new Date();
        oPlatform.date_lastchange = new Date();
        oPlatform.save(function (oErrorSaving, oResult) {
            if (oErrorSaving) {
                return oRes.status(500).json({
                    title: 'An error occurred',
                    error: oErrorSaving
                });
            }
            oRes.status(200).json({
                message: 'Updated Platform',
                obj: oResult
            });
        });
    });
});

/**
 * Obtiene todos las plataormas guardados en la base de datos.
 */
router.get('/getPlatform', function (req, res, next) {
    Platform.find({ "active": true })
        .exec(function (err, oPlatforms) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: oPlatforms
            });
        });
});

/**
 * /db/addPlatform
 * Ruta usada para agregar plataformas.
 */
router.post('/addPlatform', function (oReq, oRes, oNext) {
    console.log(oReq.body);
    var that = this;
    //-- Obteniendo el lenguaje.
    const platform = new Platform({
        title: oReq.body._title,
        active: true,
        date_creation: new Date(),
        date_lastchange: new Date()
    });

    //-- Guardando el lenguaje.
    console.log("Agregando lenguaje");
    console.log(platform);
    platform.save(function(oError, oResult) {

        //-- En caso de error.
        if (oError) {
            return oRes.status(500).json({
                title: 'An error occurred',
                error: oError
            });
        }

        //-- Plataforma guardada sucesivamente.
        oRes.status(201).json({
            message: 'Plataforma agregada',
            obj: oResult
        });
    });
});

module.exports = router;