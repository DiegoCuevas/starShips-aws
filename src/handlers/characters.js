
const customParams = (personaje) => ({
  nombre: personaje.name,
  altura: personaje.height,
  peso: personaje.mass,
  colorCabello: personaje.hair_color,
  colorPiel: personaje.skin_color,
  colorOjos: personaje.eye_color,
  añoNacimiento: personaje.birth_year,
  género: personaje.gender,
});

export const getCharacters = async (event) => {
  try {
    const response = await fetch('https://swapi.py4e.com/api/people/');
    const data = await response.json();
    const characters = data.results.map(customParams);

    return {
      statusCode: 200,
      body: JSON.stringify(characters),
    };
  } catch (error) {
    console.error('Error al obtener personajes:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ mensaje: 'Error al obtener personajes' }),
    };
  }
};
