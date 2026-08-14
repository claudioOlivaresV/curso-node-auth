import mongoose from "mongoose";

interface ConectionOptions {
  mongoUrl: string;
  dbName: string;
}
export class MongoDatabase {
  static async connect(options: ConectionOptions) {
    // Implementar la lógica de conexión a la base de datos MongoDB
    const { mongoUrl, dbName } = options;

    try {
      await mongoose.connect(mongoUrl, {
        dbName,
      });
      console.log("conectado");

      return true;
    } catch (error) {
      console.error("Error al conectar a la base de datos MongoDB:", error);
      throw error;
    }
  }
}
