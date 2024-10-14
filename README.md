# API de Naves Estelares

Esta API proporciona endpoints para gestionar información sobre naves estelares y cambiar los atributos de los personajes a español. 
Está construida con AWS Lambda, API Gateway y DynamoDB.

## Requisitos previos

- Node.js (versión 20.x o superior)
- AWS CLI configurado con las credenciales adecuadas
- Serverless Framework instalado globalmente (`npm install -g serverless`)

## Configuración

1. Clona este repositorio:
   ```
   git clone git@github.com:DiegoCuevas/starShips-aws.git
   cd api-naves
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```
   NAVES_TABLE=nombre_de_tu_tabla_dynamodb
   ```
   Reemplaza `nombre_de_tu_tabla_dynamodb` con el nombre real de tu tabla en DynamoDB.

4. Despliega la aplicación:
   ```
   serverless deploy
   ```

## Uso

La API proporciona los siguientes endpoints:

### GET /starships

Obtiene todas las naves estelares.

Ejemplo de solicitud:
```
curl https://t6c4tpoxxk.execute-api.us-east-1.amazonaws.com/dev/starShips

```
### GET /characters

Obtiene todas los personajes con los atributos en español.

Ejemplo de solicitud:
```
curl --location 'https://t6c4tpoxxk.execute-api.us-east-1.amazonaws.com/dev/characters'
```

### POST /starships

Crea una nueva nave estelar.

Ejemplo de solicitud:

```
bash
curl --location 'https://t6c4tpoxxk.execute-api.us-east-1.amazonaws.com/dev/starships' \
--header 'Content-Type: application/json' \
--data '{
  "nombre": "X-wing2",
  "modelo": "T-65 X-wing2",
  "fabricante": "Incom Corporation2",
  "costoEnCreditos": "149999",
  "longitud": "12.5",
  "velocidadMaximaAtmosfera": "1050",
  "tripulacion": "1"
}'
```
### PUT /starships/{id}

Para actualizar todos los atributos de una nave.

Ejemplo de solicitud:
```
curl --location --request PUT 'https://t6c4tpoxxk.execute-api.us-east-1.amazonaws.com/dev/starships/7f4bc566-9185-49df-90b0-1b070bd88b36' \
--header 'Content-Type: application/json' \
--data '{
  "nombre": "X-wing3",
  "modelo": "T-65 X-wing3",
  "fabricante": "Incom Corporation3",
  "costoEnCreditos": "14",
  "longitud": "12.5",
  "velocidadMaximaAtmosfera": "1050",
  "tripulacion": "1"
}'

```
### PATCH /starships/{id}
Para actualizar algunos de los atributos de una nave.

Ejemplo de solicitud:
```
curl --location --request PATCH 'https://t6c4tpoxxk.execute-api.us-east-1.amazonaws.com/dev/starships/7f4bc566-9185-49df-90b0-1b070bd88b36' \
--header 'Content-Type: application/json' \
--data '{
    "nombre": "nuevo nombre",
   // ... otros atributos que tu desees actualizar 
}'

```
### DELETE /starships/{id}
Para eliminar una nave espacial.

Ejemplo de solicitud:
```
curl --location --request DELETE 'https://t6c4tpoxxk.execute-api.us-east-1.amazonaws.com/dev/starships/7f4bc566-9185-49df-90b0-1b070bd88b36'
```

# Desarrollo

Para ejecutar la aplicación localmente:
```
serverless offline
```
# Pruebas
Usé la libreria `vitest` para algunas pruebas unitarias.

Para ejecutar las pruebas es con el siguiente comando:
```
npm test
```