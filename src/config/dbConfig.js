import { MongoClient } from 'mongodb';

export default async function connectionMongo(stringConnection) {
  if (!stringConnection) {
    console.error('A string de conexão com o MongoDB não foi definida.');
    process.exit(1);
  }

  let mongoClient;

  try {
    mongoClient = new MongoClient(stringConnection);
    console.log('Conectando ao cluster do banco de dados...');
    await mongoClient.connect();
    console.log('Conexão ao cluster bem-sucedida');

    return mongoClient;
  } catch (error) {
    console.error('Falha ao conectar ao cluster do MongoDB:', error.message);
    process.exit(1);
  }
}
