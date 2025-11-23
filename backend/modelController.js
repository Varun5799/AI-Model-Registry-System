/* This file handles Model CRUD operations */
var fs = require("fs-extra");

var file = "./models.json";

// Get all models
var getModels = async function(req, res) {
  var data = await fs.readJSON(file);
  res.json(data);
};

// Add a new model
var addModel = async function(req, res) {
  var name = req.body.name;
  var model_name = req.body.model_name;
  var api_url = req.body.api_url;
  var api_key = req.body.api_key;

  var data = await fs.readJSON(file);

  var newModel = {
    id: Date.now(),
    name: name,
    model_name: model_name,
    api_url: api_url,
    api_key: api_key
  };

  data.push(newModel);

  await fs.writeJSON(file, data, { spaces: 2 });

  res.json({ message: "Model added!", model: newModel });
};

// Edit model
var editModel = async function(req, res) {
  var id = parseInt(req.params.id);

  var data = await fs.readJSON(file);

  var index = data.findIndex(function(m) {
    return m.id === id;
  });

  if (index === -1) {
    return res.status(404).json({ message: "Model not found" });
  }

  data[index] = { ...data[index], ...req.body };

  await fs.writeJSON(file, data, { spaces: 2 });

  res.json({
    message: "Model updated!",
    model: data[index]
  });
};

// Delete model
var deleteModel = async function(req, res) {
  var id = parseInt(req.params.id);

  var data = await fs.readJSON(file);

  var filteredData = data.filter(function(m) {
    return m.id !== id;
  });

  await fs.writeJSON(file, filteredData, { spaces: 2 });

  res.json({ message: "Model deleted!" });
};

module.exports = {
  getModels,
  addModel,
  editModel,
  deleteModel
};
