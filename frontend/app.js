const API = "http://localhost:5000";

// --- 1. BACKEND CONNECTION FUNCTIONS ---

// Load Models for dropdowns + "Show All"
async function loadAll() {
  try {
    const res = await fetch(`${API}/models`);
    const models = await res.json();

    // 1. Update "Show All" box
    const outputBox = document.getElementById("all_output");
    if (outputBox) {
      outputBox.textContent = JSON.stringify(models, null, 2);
    }

    // 2. Update Inference Dropdown
    const select = document.getElementById("model-select");
    if (select) {
      select.innerHTML = "";
      models.forEach(m => {
        select.innerHTML += `<option value="${m.id}">${m.name}</option>`;
      });
    }

    // 3. Update DELETE Dropdown (New Feature)
    const deleteSelect = document.getElementById("delete-model-select");
    if (deleteSelect) {
      deleteSelect.innerHTML = "<option value='' disabled selected>Select a model...</option>";
      models.forEach(m => {
        deleteSelect.innerHTML += `<option value="${m.id}">${m.name}</option>`;
      });
    }

  } catch (err) {
    console.error("Connection Error:", err);
    const outputBox = document.getElementById("all_output");
    if(outputBox) outputBox.textContent = "Error connecting to backend. Is the server running?";
  }
}

// Add Model
async function addModel(event) {
  event.preventDefault();

  // REMOVED framework
  const data = {
    name: document.getElementById("name").value, // Display Name
    model_name: document.getElementById("model_id").value, // Technical HF ID
    api_url: document.getElementById("api_url").value,
    api_key: document.getElementById("api_key").value
  };

  try {
    await fetch(`${API}/models`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    alert("Model Added Successfully!");
    loadAll(); 
    event.target.reset();
  } catch (err) {
    alert("Error adding model: " + err.message);
  }
}

// View (search by name)
async function viewModel(event) {
  event.preventDefault();
  const name = document.getElementById("view_name").value;
  
  try {
    const res = await fetch(`${API}/models`);
    const models = await res.json();
    const found = models.find(m => m.name === name);

    document.getElementById("view_output").textContent =
      found ? JSON.stringify(found, null, 2)
            : "Model Not Found in Registry.";
  } catch (err) {
    document.getElementById("view_output").textContent = "Connection Failed.";
  }
}

// Update Model
async function updateModel(event) {
  event.preventDefault();

  const name = document.getElementById("update_name").value;

  try {
    const res = await fetch(`${API}/models`);
    const models = await res.json();

    const found = models.find(m => m.name === name);
    if (!found) return alert("Model Not Found");

    // Removed framework from update logic
    const body = {
      api_url: document.getElementById("update_api_url").value || found.api_url,
      api_key: document.getElementById("update_api_key").value || found.api_key,
      model_name: document.getElementById("update_model_id").value || found.model_name
    };

    await fetch(`${API}/models/${found.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    alert("System Updated!");
    loadAll();
    event.target.reset();
  } catch (err) {
    alert("Update failed: " + err.message);
  }
}

// Delete Model (Updated to use Dropdown ID)
async function deleteModel(event) {
  event.preventDefault();

  // Get ID from the dropdown instead of searching by name text
  const id = document.getElementById("delete-model-select").value;

  if (!id) return alert("Please select a model to delete.");

  if (confirm(`Are you sure you want to delete this model?`)) {
    try {
      await fetch(`${API}/models/${id}`, {
        method: "DELETE"
      });
      alert("Model Deleted!");
      loadAll();
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  }
}

// Run Inference
async function runInference(event) {
  event.preventDefault();

  const model_id = document.getElementById("model-select").value;
  const prompt = document.getElementById("prompt").value;
  const outputArea = document.getElementById("output");

  outputArea.textContent = "Initializing Neural Handshake...\nSending Packets...";
  
  try {
    const res = await fetch(`${API}/infer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model_id, prompt })
    });

    const result = await res.json();
    outputArea.textContent = result.output || "No output returned.";
    
  } catch (err) {
    outputArea.textContent = "CRITICAL ERROR: Connection severed.\n" + err.message;
  }
}


// --- 2. UI / FRONTEND LOGIC ---

function showForm(formId, btnElement) {
  document.querySelectorAll(".hidden-panel, .active-panel").forEach(f => {
    f.classList.remove("active-panel");
    f.classList.add("hidden-panel");
  });

  const target = document.getElementById(formId);
  if (target) {
    target.classList.remove("hidden-panel");
    target.classList.add("active-panel");
  }

  if (btnElement) {
    document.querySelectorAll(".nav-item").forEach(b => b.classList.remove("active"));

    if (btnElement.classList.contains('nav-item')) {
       btnElement.classList.add("active");
    } else if (btnElement.closest('.nav-item')) {
       btnElement.closest('.nav-item').classList.add("active");
    }

    const span = btnElement.querySelector('span');
    if (span) {
       const sectionTitle = document.getElementById('current-section');
       if(sectionTitle) sectionTitle.innerText = span.innerText;
    }
  }
}

// --- 3. INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  loadAll();
  const firstNav = document.querySelector(".nav-item");
  if(firstNav) firstNav.classList.add("active");
});