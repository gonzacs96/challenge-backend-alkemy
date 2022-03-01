const { Character, Movie } = require("../db");

const getCharacterById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const character = await Character.findByPk(id, {
      include: {
        model: Movie,
        through: {
          attributes: [],
        },
        attributes: ["id", "title"],
      },
    });
    res.status(200).json(character);
  } catch (error) {
    next(error);
  }
};

module.exports = getCharacterById;
