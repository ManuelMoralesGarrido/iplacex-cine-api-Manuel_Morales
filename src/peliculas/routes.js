import express from 'express';
import {
    handleInsertPeliculaRequest,
    handleGetPeliculasRequest,
    handleGetPeliculaByIdRequest,
    handleUpdatePeliculaByIdRequest,
    handleDeletePeliculaByIdRequest
} from './controller.js';

export const peliculaRoutes = express.Router();

peliculaRoutes.post('/pelicula', handleInsertPeliculaRequest);
peliculaRoutes.get('/peliculas', handleGetPeliculasRequest);
peliculaRoutes.get('/película/:id', handleGetPeliculaByIdRequest);
peliculaRoutes.put('/película/:id', handleUpdatePeliculaByIdRequest);
peliculaRoutes.delete('/película/:id', handleDeletePeliculaByIdRequest);