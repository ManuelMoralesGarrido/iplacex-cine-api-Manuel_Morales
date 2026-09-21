import express from 'express';
import cors from 'cors';
import { connectDB } from './src/common/db.js';
import { peliculaRoutes } from './src/peliculas/routes.js';
import { ActorRoutes } from './src/actor/routes.js';

const app = express();
const PORT = 3000;

// config de Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta por defecto
app.get('/', (req, res) => {
    res.send("Bienvenidd  al cine Iplacex");
});

// prefijo /api
app.use('/api', peliculaRoutes);
app.use('/api', ActorRoutes);

// Inicialización
const startServer = async () => {
    try {
        await connectDB(); 
        
        app.listen(PORT, () => {
            console.log(`¡Servidor Express corriendo con éxito en el puerto ${PORT}!`);
        });
    } catch (error) {
        console.error("Fallo al iniciar el servidor Express. Verifica tu conexión a BD.", error);
    }
};

startServer();
