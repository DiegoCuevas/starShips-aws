import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getCharacters } from '../../src/handlers/characters';

global.fetch = vi.fn();

describe('getCharacters', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('debería retornar una respuesta exitosa con personajes', async () => {
    const mockedData = {
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
    };

    fetch.mockResolvedValue({
      json: async () => mockedData,
    });

    const event = {};
    const result = await getCharacters(event);

    const expectedCharacters = mockedData.results.map((personaje) => ({
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

    expect(fetch).toHaveBeenCalledWith('https://swapi.py4e.com/api/people/');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('debería manejar errores y retornar statusCode 500', async () => {
    const mockedError = new Error('Network Error');
    fetch.mockRejectedValue(mockedError);

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const event = {};
    const result = await getCharacters(event);

    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({ mensaje: 'Error al obtener personajes' }),
    });

    expect(fetch).toHaveBeenCalledWith('https://swapi.py4e.com/api/people/');
    expect(fetch).toHaveBeenCalledTimes(1);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error al obtener personajes:', mockedError);

    consoleErrorSpy.mockRestore();
  });
});

