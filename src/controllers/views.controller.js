import express from 'express';
import * as viewsController from '../controllers/views.controller.js';
import Mascota from '../models/Mascotas.model.js';

export const viewHome = (req, res) => {
    try {
        res.render("home");
    } catch (error) {
        res.status(500).send("Error al cargar página home...");
    }
}

export const viewMascotas = (req, res) => {
    try {
        let { mascotas } = Mascota.obtenerMascotas();
        res.render("mascotas", {
            mascotas
        });
    } catch (error) {
        res.status(500).send("Error al cargar página de mascotas...");
    }
}

export const viewPerfilMascota = (req, res) => {
    try {
        let { id } = req.params;
        const mascota = Mascota.obtenerMacotasPorID(id);

        res.render("perfilMascota", {
            mascota,
            id
        });
    } catch (error) {
        res.status(500).send("Error al cargar página de perfil usuario.");
    }
}

export const viewCrearMascota = (req, res) => {
    try {
        res.render("crearMascotas");        
    } catch (error) {
        res.status(500).send("Error al cargar página crear usuarios...");
    }

}

export const viewActualizarMascota = (req, res) => {
    try {
        const { id } = req.params;
        const mascota = Mascota.obtenerMacotasPorID(id);
        res.render("actualizarMascota", { mascota, id });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al cargar el formulario de actualización.");
    }
};