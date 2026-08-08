//MODULOS PROPIOS DE Node.js
import { fileURLToPath } from "url";
import * as path from "path";

// PAQUETES INSTALADOS MEDIANTE npm
import express from "express";
import { create } from "express-handlebars";
import { v4 as uuidV4 } from "uuid";
import moment from "moment";

//ARCHIVOS CREADOS DENTRO DEL PROYECTO
import mascotasRoutes from "./routes/mascotas.routes.js"; 
import viewsRoutes from "./routes/view.routes.js";
import { registrarLog } from "./utils/persistencia.js"; 


const app = express();
moment.locale("es") // Lo ocuparemos para la creación de logs

// Ruta absoluta de la carpeta src
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//CONFIGURACION MOTOR DE PLANTILLAS
const hbs = create({
    partialsDir: [
        path.join(__dirname, "/views/partials"), // Aún no tenemos carpeta ni archivo creado
    ],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

//ARCHIVOS ESTÁTICOS
app.use(express.static(path.join(__dirname, "public")));

//REGISTRO DE PETICIONES
app.use((req, res, next) => {
    try {
        let codigo = uuidV4().slice(0, 6);
        let fechaHora = moment().format("MMMM DD [del] YYYY, hh:mm:ss a");
        let metodo = req.method;
        let ruta = req.path;
        let mensaje = `${codigo} - [${fechaHora}], Método: ${metodo}, Ruta: ${ruta}`;

        registrarLog("log_request.txt", mensaje);

    } catch (error) {
        console.log(error);
    }finally{
        next();
    }
});


//MIDDLEWARES
app.use(express.json()); // GUARDA JSON EN BODY
app.use(express.urlencoded({ extended: true }));//GUARDA DATOS ENVIADOS DESDE FORM EN BODY 

//RUTAS DE VISTA
app.use("/", viewsRoutes);


//RUTAS DE API
app.use("/api/mascotas", mascotasRoutes)



export default app;
