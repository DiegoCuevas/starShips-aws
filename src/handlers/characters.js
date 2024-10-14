
const customParams = (character) => ({
  nombre: character.name,
  altura: character.height,
  peso: character.mass,
  colorCabello: character.hair_color,
  colorPiel: character.skin_color,
  colorOjos: character.eye_color,
  añoNacimiento: character.birth_year,
  género: character.gender,
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
