const { Movie } = require("../db");

const deleteMovie = async (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    return res
      .status(200)
      .json({ msg: "Debe enviar por body un id para eliminar una pelicula" });
  }
  try {
    const deleted = await Movie.destroy({
      where: { id: id },
    });
    deleted === 1
      ? res.status(200).json({ msg: "Pelicula eliminada correctamente" })
      : res.status(200).json({ msg: "No se encontro una pelicula con esa id" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteMovie;
