const { Character, Movie } = require("../db");

const getCharacters = async (req, res, next) => {
  let { name, age, movies } = req.query;
  try {
    let characters_db = await Character.findAll({
      include: Movie,
    });
    if (name) {
      name = name.toLowerCase();
      characters_db = characters_db.filter((character) =>
        character.name.includes(name)
      );
    }
    if (age) {
      characters_db = characters_db.filter(
        (character) => character.age === parseInt(age)
      );
    }
    if (movies) {
      const movie = await Movie.findByPk(movies);
      characters_db = characters_db.filter((character) => {
        for (let index = 0; index < character.movies.length; index++) {
          if (character.movies[index].title === movie.title) return true;
        }
      });
    }
    characters_db = characters_db.map((character) => {
      return {
        id: character.id,
        name: character.name,
        img: character.img,
      };
    });
    res.status(200).json(characters_db);
  } catch (error) {
    next(error);
  }
};

module.exports = getCharacters;
