const { Movie, Character, Genre } = require("../db");

const getMovieById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByPk(id, {
      include: [
        {
          model: Character,
          through: { attributes: [] },
          attributes: ["id", "name"],
        },
        {
          model: Genre,
          through: { attributes: [] },
          attributes: ["id", "name"],
        },
      ],
    });
    res.status(200).json(movie);
  } catch (error) {
    next(error);
  }
};

module.exports = getMovieById;
