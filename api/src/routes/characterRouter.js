const { Router } = require("express");
const router = Router();
const getCharacters = require("../controllers/getCharacters");
const getCharacterById = require("../controllers/getCharacterById");
const createCharacter = require("../controllers/createCharacter");
const deleteCharacter = require("../controllers/deleteCharacter");
const editCharacter = require("../controllers/editCharacter");

router.get("/", getCharacters);

router.get("/:id", getCharacterById);

router.post("/", createCharacter);

router.delete("/", deleteCharacter);

router.put("/", editCharacter);

module.exports = router;
