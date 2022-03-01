const { Character } = require("../db");

const deleteCharacter = async (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    return res
      .status(200)
      .json({ msg: "Debe enviar un id por body para eliminar un personaje" });
  }
  try {
    const deleted = await Character.destroy({
      where: { id: id },
    });
    deleted === 1
      ? res.status(200).json({ msg: "Eliminado correctamente" })
      : res
          .status(200)
          .json({ msg: "No se encontro ningun personaje con ese id" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteCharacter;
