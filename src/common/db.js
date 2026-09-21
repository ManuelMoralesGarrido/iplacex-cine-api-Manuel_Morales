import { MongoClient } from 'mongodb';

//recordatorio de cambniar la contra
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

export const connectDB = async () => {  
    try {
        await client.connect();
        console.log("conexión exitosa a MongoDB Atlas");
        return client.db("cine-db");
    } catch (error) {
        console.error("error al conectar a la base de datos:", error);
        process.exit(1); 
    }
};

export const getClient = () => client;