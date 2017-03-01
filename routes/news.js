var express = require('express');
var router = express.Router();
var News = require('../models/newsdb')

/**
 * Ruta usada cuando se debe de eliminar una noticia.
 */
router.patch('/deleteNews/:id', function (oReq, oRes, oNext) {
    News.findById(oReq.params.id, function (oError, oNews) {

        //-- Error conectando
        if (oError) {
            return oRes.status(500).json({
                title: 'An error occurred',
                error: oError
            });
        }

        //-- Conectado pero no se encontro noticia
        if (!oNews) {
            return oRes.status(500).json({
                title: 'No News Found!',
                error: { message: 'News not found' }
            });
        }

        //-- Noticia encontrada
        oNews.active = false;
        oNews.date_delete = new Date();
        oNews.date_lastchange = new Date();
        oNews.save(function (oErrorSaving, oResult) {
            if (oErrorSaving) {
                return oRes.status(500).json({
                    title: 'An error occurred',
                    error: oErrorSaving
                });
            }
            oRes.status(200).json({
                message: 'Noticia eliminada',
                obj: oResult
            });
        });
    });
});

/**
 * Ruta usada cuando se debe de actualizar una noticia.
 */
router.patch('/updateNews/:id', function (oReq, oRes, oNext) {
    News.findById(oReq.params.id, function (oError, oNews) {

        //-- Error conectando
        if (oError) {
            return oRes.status(500).json({
                title: 'An error occurred',
                error: oError
            });
        }

        //-- Conectado pero no se encontro lenguaje
        if (!oNews) {
            return oRes.status(500).json({
                title: 'No News Found!',
                error: { message: 'News not found' }
            });
        }

        //-- Noticia encontrada
        oNews.header = oReq.body._header;
        oNews.languageId = oReq.body._languageId;
        oNews.appId = oReq.body._appId;
        oNews.body = oReq.body._body;
        oNews.published = oReq.body._published;
        oNews.date_update = new Date();
        oNews.date_lastchange = new Date();
        oNews.save(function (oErrorSaving, oResult) {
            if (oErrorSaving) {
                return oRes.status(500).json({
                    title: 'An error occurred',
                    error: oErrorSaving
                });
            }
            oRes.status(200).json({
                message: 'Updated News',
                obj: oResult
            });
        });
    });
});

/**
 * Obtiene todas las noticias guardadas en la base de datos.
 */
router.get('/getNews', function (req, res, next) {
    News.find({ "active": true })
        .exec(function (err, oNews) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }

            //-- Regresa todo.
            res.status(200).json({
                message: 'Success',
                obj: oNews
            });
        });
});

/**
 * /db/addNews
 * Ruta usada para agregar una noticia.
 */
router.post('/addNews', function (oReq, oRes, oNext) {

    //-- Obteniendo la app.
    const news = new News({
        header: oReq.body._header,
        body: oReq.body._body,
        languageId: oReq.body._languageId,
        appId: oReq.body._appId,
        published: oReq.body._published,
        active: true,
        date_visible: oReq.body._date_visible,
        date_creation: new Date(),
        date_lastchange: new Date(),
    });

    //-- Guardando el lenguaje.
    news.save(function (oError, oResult) {

        //-- En caso de error.
        if (oError) {
            return oRes.status(500).json({
                title: 'An error occurred',
                error: oError
            });
        }

        //-- Mensaje guardado sucesivamente.
        oRes.status(201).json({
            message: 'Noticia agregada',
            obj: oResult
        });
        //console.log(oRes);
    });
});

module.exports = router;