const { Character } = require("../db");

const editCharacter = async (req, res, next) => {
  const { id, img, name, age, weight, history, movies } = req.body;
  if (!id) {
    return res.status(200).json({
      msg: "Debe enviar por body el id del personaje que quiere editar",
    });
  }
  try {
    const values_edit = {};
    img ? (values_edit.img = img) : null;
    name ? (values_edit.name = name) : null;
    age ? (values_edit.age = age) : null;
    weight ? (values_edit.weight = weight) : null;
    history ? (values_edit.history = history) : null;
    const [character_updated_count] = await Character.update(values_edit, {
      where: {
        id: id,
      },
    });
    const character_updated = await Character.findByPk(id);
    await character_updated.setMovies(movies);

    res.status(200).json({ msg: "Personaje editado correctamente" });
  } catch (error) {
    next(error);
  }
};

module.exports = editCharacter;
