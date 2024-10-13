// tests/characters.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import { getCharacters } from '../../src/handlers/characters';

vi.mock('axios');

describe('getCharacters', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('debería retornar una respuesta exitosa con personajes', async () => {
    const mockedData = {
      data: {
        results: [
          {
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            hair_color: 'blond',
            skin_color: 'fair',
            eye_color: 'blue',
            birth_year: '19BBY',
            gender: 'male',
          },
        ],
      },
    };

    axios.get.mockResolvedValue(mockedData);

    const event = {};
    const result = await getCharacters(event);

    const expectedCharacters = mockedData.data.results.map((personaje) => ({
      nombre: personaje.name,
      altura: personaje.height,
      peso: personaje.mass,
      colorCabello: personaje.hair_color,
      colorPiel: personaje.skin_color,
      colorOjos: personaje.eye_color,
      añoNacimiento: personaje.birth_year,
      género: personaje.gender,
    }));

    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify(expectedCharacters),
    });

    expect(axios.get).toHaveBeenCalledWith('https://swapi.py4e.com/api/people/');
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it('debería manejar errores y retornar statusCode 500', async () => {
    const mockedError = new Error('Network Error');
    axios.get.mockRejectedValue(mockedError);

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const event = {};
    const result = await getCharacters(event);

    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({ mensaje: 'Error al obtener personajes' }),
    });

    expect(axios.get).toHaveBeenCalledWith('https://swapi.py4e.com/api/people/');
    expect(axios.get).toHaveBeenCalledTimes(1);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error al obtener personajes:', mockedError);

    consoleErrorSpy.mockRestore();
  });
});
