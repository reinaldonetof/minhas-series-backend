const express = require("express");
const seriesController = require("../controllers/series");
const Serie = require("../models/serie");

const models = {
  Serie,
};

const router = express.Router();

router.get("/", seriesController.index.bind(null, models));

router.get("/nova", seriesController.novaForm);
router.post("/nova", seriesController.novaProcess.bind(null, models));

router.get("/excluir/:id", seriesController.excluir.bind(null, models));

router.get("/editar/:id", seriesController.editarForm.bind(null, models));

module.exports = router;
