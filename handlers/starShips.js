import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const createStarShips = async (event) => {
  const data = JSON.parse(event.body);
  const id = uuidv4();

  const params = {
    TableName: process.env.NAVES_TABLE,
    Item: {
      id,
      nombre: data.nombre,
      modelo: data.modelo,
      fabricante: data.fabricante,
      costoEnCreditos: data.costoEnCreditos,
      longitud: data.longitud,
      velocidadMaximaAtmosfera: data.velocidadMaximaAtmosfera,
      tripulacion: data.tripulacion,
    },
  };

  try {
    await dynamoDb.put(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify({ id, ...params.Item }),
    };
  } catch (error) {
    console.error('Error al crear nave:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ mensaje: 'Error al crear nave' }),
    };
  }
};

export const getStarShips = async () => {
  const params = {
    TableName: process.env.NAVES_TABLE,
  };

  try {
    const result = await dynamoDb.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    console.error('Error al obtener naves:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ mensaje: 'Error al obtener naves' }),
    };
  }
};
