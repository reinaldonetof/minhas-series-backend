const index = ({ Serie }, req, res) => {
  Serie.find({}, (err, docs) => {
    res.render("series/index", { series: docs });
  });
};
const novaProcess = ({ Serie }, req, res) => {
  const serie = new Serie(req.body);
  serie.save(() => {
    res.redirect("/series");
  });
};

const novaForm = (req, res) => {
  res.render("series/nova");
};

const excluir = ({ Serie }, req, res) => {
  Serie.remove(
    {
      _id: req.params.id,
    },
    (err) => {
      res.redirect("/series");
    }
  );
};

const editarProcess = ({ Serie }, req, res) => {
  const serie = new Serie(req.body);
  serie.save(() => {
    res.redirect("/series");
  });
};

const editarForm = ({ Serie }, req, res) => {
  Serie.findOne({ _id: req.params.id }, (err, serie) => {
    res.render("series/editar", { serie });
  });
};

module.exports = {
  index,
  novaProcess,
  novaForm,
  excluir,
  editarForm,
  editarProcess,
};
