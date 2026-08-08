import express from 'express';
import * as mascotaController from '../controllers/mascotas.controllers.js';


const router = express.Router();

//Obtener todas las mascotas
router.get("/", mascotaController.obtenerMascotas);

//Obtener  mascotas por ID
router.get("/:id", mascotaController.obtenerMacotasPorID);

//Crear mascotas
router.post("/", mascotaController.crearMascota);

//Elimanar mascota por ID
router.delete("/:id", mascotaController.eliminarMascota);

//Actualizar mascota por ID
router.put("/:id", mascotaController.actualizarMascota);

export default router;