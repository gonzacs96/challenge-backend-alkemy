const { Genre } = require("../db");

const getGenres = async (req, res, next) => {
  try {
    const genres = await Genre.findAll();
    res.status(200).json(genres);
  } catch (error) {
    next(error);
  }
};

module.exports = getGenres;
