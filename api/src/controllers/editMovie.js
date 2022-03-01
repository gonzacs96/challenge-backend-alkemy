const { Movie } = require("../db");

const editMovie = async (req, res, next) => {
  const { id, img, title, year, rating, genres, characters } = req.body;
  if (!id) {
    return res
      .status(200)
      .json({ msg: "Debe enviar un id por body para modificar una pelicula" });
  }
  try {
    const values_edit = {};
    img ? (values_edit.img = img) : null;
    title ? (values_edit.title = title) : null;
    year ? (values_edit.year = year) : null;
    rating ? (values_edit.rating = rating) : null;
    const [movie_updated_count] = await Movie.update(values_edit, {
      where: {
        id: id,
      },
    });
    const movie_edited = await Movie.findByPk(id);
    if (characters) {
      await movie_edited.setCharacters(characters);
    }
    if (genres) {
      await movie_edited.setGenres(genres);
    }
    res.status(200).json({ msg: "Pelicula editada correctamente" });
  } catch (error) {
    next(error)
  }
};

module.exports = editMovie;
