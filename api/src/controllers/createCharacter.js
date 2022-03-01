const { Character } = require("../db");

const createCharacter = async (req, res, next) => {
  let { img, name, age, weight, history, movies } = req.body;
  try {
    name?name=name.toLoweCase():null;
    const [character, created] = await Character.findOrCreate({
      where: { name: name },
      defaults: {
        img: img,
        name: name,
        age: age,
        weight: weight,
        history: history,
      },
    });
    if (created) {
      await character.addMovies(movies);
      res.status(200).json({
        msg: "Personaje creado exitosamente",
        character,
      });
    } else {
      res.status(200).json({
        msg: "El personaje ya existe",
        character,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = createCharacter;
