import Mascota from '../models/Mascotas.model.js';

// Obtener Mascotas
export const obtenerMascotas = (req, res) => {
    try {
        const { mascotas } = Mascota.obtenerMascotas();

        res.json({mascotas, cantidad: mascotas.length});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error al intentar obtener los datos de las mascotas..."});
    }
}

// Crear Mascotas
export const crearMascota = (req, res) => {
    try {
        let { tipoMascota, raza, nombre, edad, descripcion } = req.body;

        if(!tipoMascota || !raza || !nombre || !edad || !descripcion) {
            return res.status(400).json({message: "Todos los campos son obligatorios."});
        }

        const mascota = new Mascota(tipoMascota, raza, nombre, edad, descripcion);
        mascota.guardar();
        res.status(201).json({message: "Mascota creada con éxito", mascota});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error al intentar crear tu mascota."});
        
    }
}

//Obtener mascotas por ID
export const obtenerMacotasPorID = (req, res) => {
    try {
        let { id } = req.params;
        const mascota = Mascota.obtenerMacotasPorID(id);

        if(!mascota) return res.status(404).json({message: "Mascota no encontrada"});
        res.json({mascota});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Errpr al intentar obtener a la mascota, intenta más tarde."});
    }
}

//Eliminamos mascotas por ID
export const eliminarMascota = (req, res) => {
    try {
        let { id } = req.params;
        Mascota.eliminarMascota(id);

        res.status(201).json({message: "Mascota eliminada correctamente"});
    } catch (error) {
        console.log(error);
        if(error.code) {
            return res.status(error.code).json({message: error.message});
        }
        res.status(500).json({message: "Error al intentar eliminar la mascota"});
    }
}

//Actualizar mascotas por ID

export const actualizarMascota = (req, res) => {
    try {
        
        let { id } = req.params;
        let { tipoMascota, raza, nombre, edad, descripcion } = req.body;

        const mascota = Mascota.obtenerMacotasPorID(id);

        if(!mascota) return res.status(404).json({message: "Mascota no encontrada"});

        mascota.tipoMascota = tipoMascota || mascota.tipoMascota;
        mascota.raza = raza || mascota.raza;
        mascota.nombre = nombre || mascota.nombre;
        mascota.edad = edad || mascota.edad;
        mascota.descripcion = descripcion || mascota.descripcion;

        mascota.actualizar();

        res.status(201).json({message: "Mascota actualizada correctamente", mascota});
        } catch (error) {
            console.log(error);
            if(error.code) {
                return res.status(error.code).json({message: error.message});
            }
            res.status(500).json({message: "Error al intentar actualizar mascota"});
    }

}