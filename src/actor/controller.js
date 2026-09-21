import { getClient } from '../common/db.js';
import { ObjectId } from 'mongodb';

const actorCollection = "actores";
const peliculaCollection = "peliculas"; 

// insertar 
export const handleInsertActorRequest = async (req, res) => {
    try {
        const client = getClient();
        const peliculas = client.db().collection(peliculaCollection);
        const actores = client.db().collection(actorCollection);

        let peliculaId;
        try {
            peliculaId = new ObjectId(req.body.idPelicula);
        } catch (error) {
            return res.status(400).json({ error: "Id de película mal formado" });
        }

        const peliculaExiste = await peliculas.findOne({ _id: peliculaId });
        if (!peliculaExiste) {
            return res.status(400).json({ error: "La película asignada no existe" });
        }

        await actores.insertOne(req.body)
            .then(result => res.status(201).json({ mensaje: "Actor agregado con éxito", id: result.insertedId }))
            .catch(err => res.status(500).json({ error: "Error de BD", detalle: err.message }));
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// todos los actores
export const handleGetActoresRequest = async (req, res) => {
    try {
        const client = getClient();
        const collection = client.db().collection(actorCollection);
        
        await collection.find({}).toArray()
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json({ error: "Error de BD", detalle: err.message }));
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// actor x id
export const handleGetActorByIdRequest = async (req, res) => {
    let queryId;
    try {
        queryId = new ObjectId(req.params.id);
    } catch (error) {
        return res.status(400).json({ error: "Id mal formado" });
    }

    try {
        const client = getClient();
        const collection = client.db().collection(actorCollection);
        
        await collection.findOne({ _id: queryId })
            .then(result => {
                if (result) res.status(200).json(result);
                else res.status(404).json({ error: "Actor no encontrado" });
            })
            .catch(err => res.status(500).json({ error: "Error de BD", detalle: err.message }));
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// obtener x id
export const handleGetActoresByPeliculaIdRequest = async (req, res) => {
    try {
        const client = getClient();
        const collection = client.db().collection(actorCollection);
        
        await collection.find({ idPelicula: req.params.pelicula }).toArray()
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json({ error: "Error de BD", detalle: err.message }));
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};