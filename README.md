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

### GET /starShips

Obtiene todas las naves estelares.

Ejemplo de solicitud:
```
curl https://t6c4tpoxxk.execute-api.us-east-1.amazonaws.com/dev/starShips

```
### GET /characters

Obtiene todas los personajes con los atributos en español.

Ejemplo de solicitud:
```
curl https://t6c4tpoxxk.execute-api.us-east-1.amazonaws.com/dev/characters
```

### POST /starShips

Crea una nueva nave estelar.

Ejemplo de solicitud:

```
bash
curl -X POST https://t6c4tpoxxk.execute-api.us-east-1.amazonaws.com/dev/starShips \
-H "Content-Type: application/json" \
-d '{
"nombre": "X-wing",
"modelo": "T-65 X-wing",
"fabricante": "Incom Corporation",
"costoEnCreditos": "149999",
"longitud": "12.5",
"velocidadMaximaAtmosfera": "1050",
"tripulacion": "1"
}'
```
### PUT /starShips

Para actualizar todos los atributos de una nave.

Ejemplo de solicitud:
```
curl PUT https://t6c4tpoxxk.execute-api.us-east-1.amazonaws.com/dev/starShips/{id} \
-H "Content-Type: application/json" \
-d '{
  "nombre": "Estrella de la Muerte",
  "modelo": "Super Estrella Actualizado",
  "fabricante": "Imperio",
  "costoEnCreditos": 1000000000,
  "longitud": 120000,
  "velocidadMaximaAtmosfera": 1000,
  "tripulacion": 500000
}'

```
### PATCH /starShips
Para actualizar algunos de los atributos de una nave.

Ejemplo de solicitud:
```
curl PATCH https://t6c4tpoxxk.execute-api.us-east-1.amazonaws.com/dev/starShips/{id} \
-H "Content-Type: application/json" \
-d '{
  "nombre": "Estrella de la Muerte",
}'

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