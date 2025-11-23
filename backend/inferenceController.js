/* This file handles running inference using the selected AI model */

var fs = require("fs-extra");
var fetch = require("node-fetch");
var dotenv = require("dotenv");

dotenv.config();   // Load .env variables

var file = "./models.json";

var runInference = async function(req, res) {

  var model_id = req.body.model_id;
  var prompt = req.body.prompt;

  console.log("Incoming:", model_id, prompt);

  var models = await fs.readJSON(file);

  var model = models.find(function(m) {
    return m.id === Number(model_id);
  });

  console.log("Matched Model:", model);

  if (!model) {
    return res.status(404).json({ message: "Model not found" });
  }

  // read actual key from .env
  var realApiKey = process.env[model.api_key];

  if (!realApiKey) {
    return res.status(500).json({
      message: "API key not found in .env",
      keyName: model.api_key
    });
  }

  try {

    var response = await fetch(model.api_url, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + realApiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model.model_name,
        messages: [
          { role: "user", content: prompt }
        ],
        max_tokens: 200
      })
    });

    var text = await response.text();
    console.log("HF Raw Response:", text);

    var result;
    try {
      result = JSON.parse(text);
    } catch (err) {
      return res.status(500).json({
        message: "HF returned non-JSON response",
        raw: text
      });
    }

    res.json({
      output: result.choices?.[0]?.message?.content || "No output"
    });

  } catch (err) {
    console.error("Inference Error:", err);
    res.status(500).json({
      message: "Inference failed",
      error: err.message
    });
  }
};

module.exports = {
  runInference
};
