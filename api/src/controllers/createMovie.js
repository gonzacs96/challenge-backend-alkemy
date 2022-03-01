const { Movie } = require("../db");

const createMovie = async (req, res, next) => {
  const { img, title, year, rating, genres, characters } = req.body;
  if (!genres || !characters) {
    return res.status(200).json({
      msg: "Debe enviar un array con los id de los generos de la pelicula, y otro con los id de los personajes de la pelicula",
    });
  }
  try {
    const [movie, created] = await Movie.findOrCreate({
      where: { title: title },
      defaults: {
        img: img,
        title: title,
        year: year,
        rating: rating,
      },
    });
    if (created) {
        await movie.addGenres(genres);
        await movie.addCharacters(characters);
        res.status(200).json({ msg: "Pelicula creada exitosamente" });
        
    } else {
      res.status(200).json({ msg: "Esa pelicula ya existe" });
    }
  } catch (error) {
    next(error)
  }
};

module.exports = createMovie;
