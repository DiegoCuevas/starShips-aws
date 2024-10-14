import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';

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

export const updateStarShip = async (event) => {
  const data = JSON.parse(event.body);
  const id = event.pathParameters.id;
  const params = {
    TableName: process.env.NAVES_TABLE,
    Key: {
      id,
    },
    UpdateExpression: 'set #n = :n, #m = :m, #f = :f, #c = :c, #l = :l, #v = :v, #t = :t',
    ExpressionAttributeNames: {
      '#n': 'nombre',
      '#m': 'modelo',
      '#f': 'fabricante',
      '#c': 'costoEnCreditos',
      '#l': 'longitud',
      '#v': 'velocidadMaximaAtmosfera',
      '#t': 'tripulacion',
    },
    ExpressionAttributeValues: {
      ':n': data.nombre,
      ':m': data.modelo,
      ':f': data.fabricante,
      ':c': data.costoEnCreditos,
      ':l': data.longitud,
      ':v': data.velocidadMaximaAtmosfera,
      ':t': data.tripulacion,
    },
    ReturnValues: 'UPDATED_NEW',
  };

  try {
    const result = await dynamoDb.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    console.error('Error al actualizar nave:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ mensaje: 'Error al actualizar nave', error: error }),
    };
  }
};

export const patchStarShip = async (event) => {
  const id = event.pathParameters.id;
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.NAVES_TABLE,
    Key: { id },
    UpdateExpression: [],
    ExpressionAttributeNames: {},
    ExpressionAttributeValues: {},
    ReturnValues: "ALL_NEW",
  };

  Object.keys(data).forEach((key, index) => {
    const attrName = `#attr${index}`;
    const attrValue = `:val${index}`;
    
    params.UpdateExpression.push(`${attrName} = ${attrValue}`);
    params.ExpressionAttributeNames[attrName] = key;
    params.ExpressionAttributeValues[attrValue] = data[key];
  });

  params.UpdateExpression = `SET ${params.UpdateExpression.join(', ')}`;

  try {
    const result = await dynamoDb.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    console.error('Error al actualizar nave:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        mensaje: 'Error al actualizar nave', 
        error: error
      }),
    };
  }
};

export const deleteStarShip = async (event) => {
  const id = event.pathParameters.id;

  const params = {
    TableName: process.env.NAVES_TABLE,
    Key: { id },
  };

  try {
    await dynamoDb.delete(params).promise();
    return {
      statusCode: 204
    };
  } catch (error) {
    console.error('Error al eliminar nave:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ mensaje: 'Error al eliminar nave' }),
    };
  }
};