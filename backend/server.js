/* This JavaScript code is setting up an AI Model Registry server using Express.js */
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

// Import your controllers (CommonJS style)
var modelController = require('./modelController.js');
var inferenceController = require('./inferenceController.js');

var app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Model Registry Routes

// Get all models
app.get('/models', function(req, res) {
    modelController.getModels(req, res);
});

// Add new model
app.post('/models', function(req, res) {
    modelController.addModel(req, res);
});

// Update existing model
app.put('/models/:id', function(req, res) {
    modelController.editModel(req, res);
});

// Delete model
app.delete('/models/:id', function(req, res) {
    modelController.deleteModel(req, res);
});

// AI Inference Route

app.post('/infer', function(req, res) {
    inferenceController.runInference(req, res);
});

// Start Server

app.listen(5000, function() {
    console.log("Backend running on http://localhost:5000");
});
