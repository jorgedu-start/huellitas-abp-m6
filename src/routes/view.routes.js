import express from 'express';
import * as viewsController from '../controllers/views.controller.js';
import Mascota from "../models/Mascotas.model.js";

const router = express.Router();

//OBTENER TODOS LAS MASCOTAS
router.get("/", viewsController.viewHome);

//ESTADO DEL SERVIDOR
router.get("/status", (req, res) => {
    res.status(201).json({
        status: "OK",
        message: "Servidor funcionando correctamente"
    });
});

//VISTA DE MASCOTAS
router.get("/mascotas",viewsController.viewMascotas);

//VISTA PERFIL MASCOTA
router.get("/mascota/perfil/:id", viewsController.viewPerfilMascota);

//VISTA CREAR MASCOTAS
router.get("/crear-mascota", viewsController.viewCrearMascota);

//VISTA EDITAR MASCOTAS
router.get("/mascotas/actualizar/:id", viewsController.viewActualizarMascota);


export default router;