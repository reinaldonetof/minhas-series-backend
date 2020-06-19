const labels = [
  { id: "to-watch", name: "Para assistir" },
  { id: "watching", name: "Assistindo" },
  { id: "watched", name: "Assistido" },
];

const pagination = async (model, conditions, params) => {
  const total = await model.countDocuments(conditions);
  const pageSize = parseInt(params.pageSize) || 20;
  const currentPage = parseInt(params.page) || 0;
  let pages = parseInt(total) / pageSize;
  if (!Number.isInteger(pages)) pages = parseInt(pages) + 1;

  const pagination = {
    currentPage,
    pageSize,
    pages,
  };

  const results = await model
    .find(conditions)
    .skip(currentPage * pageSize)
    .limit(pageSize);

  return {
    data: results,
    pagination,
  };
};

const index = async ({ Serie }, req, res) => {
  const results = await pagination(Serie, {}, req.query);
  res.render("series/index", { results, labels });
};
const novaProcess = async ({ Serie }, req, res) => {
  const serie = new Serie(req.body);
  try {
    await serie.save();
    res.redirect("/series");
  } catch (e) {
    res.render("series/nova", {
      errors: Object.keys(e.errors),
    });
  }
};

const novaForm = (req, res) => {
  res.render("series/nova", { errors: [] });
};

const excluir = async ({ Serie }, req, res) => {
  await Serie.remove({ _id: req.params.id });
  res.redirect("/series");
};

const editarProcess = async ({ Serie }, req, res) => {
  const serie = await Serie.findOne({ _id: req.params.id });
  serie.name = req.body.name;
  serie.status = req.body.status;
  try {
    await serie.save();
    res.redirect("/series");
  } catch (e) {
    res.render("series/editar", {
      serie,
      labels,
      errors: Object.keys(e.errors),
    });
  }
};

const editarForm = async ({ Serie }, req, res) => {
  const serie = await Serie.findOne({ _id: req.params.id });
  res.render("series/editar", { serie, labels, errors: [] });
};

const info = async ({ Serie }, req, res) => {
  const serie = await Serie.findOne({ _id: req.params.id });
  res.render("series/info", { serie, labels });
};

const addComentario = async ({ Serie }, req, res) => {
  await Serie.updateOne(
    { _id: req.params.id },
    { $push: { coments: req.body.comentario } }
  );
  res.redirect("/series/info/" + req.params.id);
};

module.exports = {
  index,
  novaProcess,
  novaForm,
  excluir,
  editarForm,
  editarProcess,
  info,
  addComentario,
};
