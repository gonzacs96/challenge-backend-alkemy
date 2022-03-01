const { Router } = require("express");
const createMovie = require("../controllers/createMovie");
const deleteMovie = require("../controllers/deleteMovie");
const editMovie = require("../controllers/editMovie");
const getMovieById = require("../controllers/getMovieById");
const getMovies = require("../controllers/getMovies");
const router = Router();

router.get("/", getMovies);

router.get("/:id", getMovieById);

router.post("/", createMovie);

router.delete("/", deleteMovie);

router.put("/", editMovie);

module.exports = router;
