import { getClient } from '../common/db.js';
import { ObjectId } from 'mongodb';

const peliculaCollection = "peliculas";

// insertar pelis
export const handleInsertPeliculaRequest = async (req, res) => {
    try {
        const client = getClient();
        const collection = client.db().collection(peliculaCollection);
        
        await collection.insertOne(req.body)
            .then(result => res.status(201).json({ mensaje: "Película agregada", id: result.insertedId }))
            .catch(err => res.status(500).json({ error: "Error de BD", detalle: err.message }));
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// obtener todas las pelis
export const handleGetPeliculasRequest = async (req, res) => {
    try {
        const client = getClient();
        const collection = client.db().collection(peliculaCollection);
        
        await collection.find({}).toArray()
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json({ error: "Error de BD", detalle: err.message }));
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// obtener peli x id
export const handleGetPeliculaByIdRequest = async (req, res) => {
    let queryId;
    try {
        queryId = new ObjectId(req.params.id);
    } catch (error) {
        return res.status(400).json({ error: "Id mal formado" });
    }

    try {
        const client = getClient();
        const collection = client.db().collection(peliculaCollection);
        
        await collection.findOne({ _id: queryId })
            .then(result => {
                if (result) res.status(200).json(result);
                else res.status(404).json({ error: "Película no encontrada" });
            })
            .catch(err => res.status(500).json({ error: "Error de BD", detalle: err.message }));
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// actualizar x id
export const handleUpdatePeliculaByIdRequest = async (req, res) => {
    let queryId;
    try {
        queryId = new ObjectId(req.params.id);
    } catch (error) {
        return res.status(400).json({ error: "Id mal formado" });
    }

    try {
        const client = getClient();
        const collection = client.db().collection(peliculaCollection);
        
        await collection.updateOne({ _id: queryId }, { $set: req.body })
            .then(result => {
                if (result.matchedCount === 0) res.status(404).json({ error: "Película no encontrada" });
                else res.status(200).json({ mensaje: "Película actualizada" });
            })
            .catch(err => res.status(500).json({ error: "Error de BD", detalle: err.message }));
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// eliminar x id
export const handleDeletePeliculaByIdRequest = async (req, res) => {
    let queryId;
    try {
        queryId = new ObjectId(req.params.id);
    } catch (error) {
        return res.status(400).json({ error: "Id mal formado" });
    }

    try {
        const client = getClient();
        const collection = client.db().collection(peliculaCollection);
        
        await collection.deleteOne({ _id: queryId })
            .then(result => {
                if (result.deletedCount === 0) res.status(404).json({ error: "Película no encontrada" });
                else res.status(200).json({ mensaje: "Película eliminada" });
            })
            .catch(err => res.status(500).json({ error: "Error de BD", detalle: err.message }));
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};