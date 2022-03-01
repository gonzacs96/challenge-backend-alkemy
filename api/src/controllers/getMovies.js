const { Movie, Genre } = require("../db");

const getMovies = async (req, res, next) => {
  let { title, order, genre } = req.query;
  try {
    let movies_db = await Movie.findAll({
      include: Genre,
    });
    if (title) {
      title = title.toLowerCase();
      movies_db = movies_db.filter((movie) => movie.title.includes(title));
    }
    if (genre) {
      const genre_db = await Genre.findByPk(genre);
      movies_db = movies_db.filter((movie) => {
        for (let index = 0; index < movie.genres.length; index++) {
          if (movie.genres[index].name === genre_db.name) return true;
        }
      });
    }
    if (order) {
      order === "ASC"
        ? (movies_db = movies_db.sort((a, b) => a - b))
        : (movies_db = movies_db.sort((a, b) => b - a));
    }
    movies_db = movies_db.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        img: movie.img,
        year: movie.year,
      };
    });
    res.status(200).json(movies_db);
  } catch (error) {
    next(error);
  }
};

module.exports = getMovies;
