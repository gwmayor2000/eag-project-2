// Storage keys used to read/write the API keys in chrome.storage.local
const STORAGE_KEY = "tmdbApiKey";
const GEMINI_KEY = "geminiApiKey";
const GEMINI_MODEL_KEY = "selectedGeminiModel";

// Wait until the options page DOM is parsed, then load saved keys and wire Save
document.addEventListener("DOMContentLoaded", async () => {
  // Reference to the password-style inputs
  const keyInput = document.getElementById("apiKey");
  const geminiInput = document.getElementById("geminiKey");
  // Reference to the model selection elements
  const modelSection = document.getElementById("modelSection");
  const modelSelect = document.getElementById("modelSelect");
  const modelDesc = document.getElementById("modelDesc");
  // Inline message area next to Save (e.g. "Saved.")
  const status = document.getElementById("status");

  // Read the storage object for our keys and selected model
  const data = await chrome.storage.local.get([STORAGE_KEY, GEMINI_KEY, GEMINI_MODEL_KEY]);
  
  // Pre-fill inputs if keys were saved before
  if (data[STORAGE_KEY]) keyInput.value = data[STORAGE_KEY];
  if (data[GEMINI_KEY]) {
    geminiInput.value = data[GEMINI_KEY];
    // If we have a key, try to load models
    await refreshModelList(data[GEMINI_KEY], data[GEMINI_MODEL_KEY]);
  }

  // When model selection changes, update the description
  modelSelect.addEventListener("change", () => {
    const selectedOption = modelSelect.options[modelSelect.selectedIndex];
    modelDesc.textContent = selectedOption ? selectedOption.dataset.desc : "";
  });

  // When the user clicks Save, persist the trimmed keys
  document.getElementById("save").addEventListener("click", async () => {
    // Trim whitespace from the API keys
    const tmdbVal = keyInput.value.trim();
    const geminiVal = geminiInput.value.trim();
    const selectedModel = modelSelect.value;

    // Write the keys to local extension storage
    await chrome.storage.local.set({
      [STORAGE_KEY]: tmdbVal,
      [GEMINI_KEY]: geminiVal,
      [GEMINI_MODEL_KEY]: selectedModel
    });

    // Confirm save to the user
    status.textContent = "Saved.";

    // If a new Gemini key was provided, refresh the model list
    if (geminiVal) {
      await refreshModelList(geminiVal, selectedModel);
    } else {
      modelSection.classList.add("hidden");
    }

    // Hide the status text after two seconds
    setTimeout(() => {
      status.textContent = "";
    }, 2000);
  });

  /**
   * Fetches the list of models from the Gemini API and populates the dropdown
   */
  async function refreshModelList(apiKey, currentModel) {
    if (!apiKey) return;
    
    try {
      const resp = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`);
      if (!resp.ok) throw new Error("Could not fetch models");
      
      const data = await resp.json();
      // Filter for models that support generating content
      const models = data.models.filter(m => m.supportedGenerationMethods.includes("generateContent"));
      
      // Clear and populate the select
      modelSelect.innerHTML = "";
      models.forEach(m => {
        const opt = document.createElement("option");
        opt.value = m.name; // e.g. "models/gemini-1.5-flash"
        opt.textContent = m.displayName;
        opt.dataset.desc = m.description || "";
        if (m.name === currentModel) opt.selected = true;
        modelSelect.appendChild(opt);
      });

      // Show the section
      modelSection.classList.remove("hidden");
      // Trigger initial description
      const selectedOption = modelSelect.options[modelSelect.selectedIndex];
      modelDesc.textContent = selectedOption ? selectedOption.dataset.desc : "";
      
    } catch (e) {
      console.error(e);
      modelSection.classList.add("hidden");
    }
  }
});
