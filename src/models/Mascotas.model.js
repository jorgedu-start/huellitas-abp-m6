import { v4 as uuidV4 } from "uuid";
import { leerArchivo, escribirArchivo } from "../utils/persistencia.js";

const nombreArchivo = "mascotas.json";

class Mascota {
    constructor(tipoMascota, raza, nombre, edad, descripcion, id = uuidV4()) {
        this.id = id;
        this.tipoMascota = tipoMascota;
        this.raza = raza;
        this.nombre = nombre;
        this.edad = edad;
        this.descripcion = descripcion;
    }

    //Método de instancia "Guardar"
    guardar() {
        const data = leerArchivo(nombreArchivo);
        data.mascotas.push(this);
        escribirArchivo(nombreArchivo, data);
        return true;
    }
    
    //Método de instancia "Actualizar"
    actualizar() {
        const data = leerArchivo(nombreArchivo);
        let indiceMascota = data.mascotas.findIndex((m) => m.id == this.id);

        if(indiceMascota == -1) {
            const error = new Error("Mascota no existe en base de datos...");
            error.code = 400;
            throw error;
        }

        data.mascotas[indiceMascota] = this;
        escribirArchivo(nombreArchivo, data);
        return true;
    }

    //Métodos estáticos
    //Obtener total de mascotas
    static obtenerMascotas() {
        const data = leerArchivo(nombreArchivo);
        return data;
    }

    //Obtener mascotas por ID
    static obtenerMacotasPorID(idMascota) {
        const { mascotas } = leerArchivo(nombreArchivo);
        const mascota = mascotas.find((m) => m.id == idMascota);
        if(!mascota) return false;

        let { tipoMascota, raza, nombre, edad, descripcion, id } = mascota;

        return new Mascota( tipoMascota, raza, nombre, edad, descripcion, id);
    }

    static eliminarMascota(id) {
        const data = leerArchivo(nombreArchivo);
        let indiceMascota = data.mascotas.findIndex((m) => m.id == id);
        if(indiceMascota == -1) {
            const error = new Error("Mascota no existe en la base de datos...");
            error.code = 400;
            throw error;
        }

        data.mascotas.splice(indiceMascota, 1);
        escribirArchivo(nombreArchivo, data);
        return true;
    }
}

export default Mascota;
