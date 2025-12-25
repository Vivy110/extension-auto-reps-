const providerInfo = {
  anthropic: {
    url: 'https://console.anthropic.com',
    defaultModel: 'claude-sonnet-4-20250514',
    models: [
      'claude-sonnet-4-20250514',
      'claude-opus-4-20250514',
      'claude-sonnet-3-5-20241022',
      'claude-haiku-3-5-20241022'
    ]
  },
  openai: {
    url: 'https://platform.openai.com/api-keys',
    defaultModel: 'gpt-4o',
    models: [
      'gpt-4o',
      'gpt-4o-mini',
      'gpt-4-turbo',
      'gpt-3.5-turbo'
    ]
  },
  gemini: {
    url: 'https://aistudio.google.com/app/apikey',
    defaultModel: 'gemini-1.5-pro',
    models: [
      'gemini-1.5-pro',
      'gemini-1.5-flash',
      'gemini-2.0-flash-exp'
    ]
  },
  groq: {
    url: 'https://console.groq.com/keys',
    defaultModel: 'llama-3.3-70b-versatile',
    models: [
      'llama-3.3-70b-versatile',
      'llama-3.1-70b-versatile',
      'mixtral-8x7b-32768',
      'gemma2-9b-it'
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const apiProviderSelect = document.getElementById('apiProvider');
  const modelInput = document.getElementById('model');
  const apiKeyInput = document.getElementById('apiKey');
  const systemPromptInput = document.getElementById('systemPrompt');
  const saveBtn = document.getElementById('saveBtn');
  const status = document.getElementById('status');
  const apiInfo = document.getElementById('apiInfo');
  const modelInfo = document.getElementById('modelInfo');
  
  // Load saved settings
  chrome.storage.sync.get(['apiProvider', 'apiKey', 'systemPrompt', 'model'], (result) => {
    if (result.apiProvider) {
      apiProviderSelect.value = result.apiProvider;
    }
    if (result.apiKey) {
      apiKeyInput.value = result.apiKey;
    }
    if (result.model) {
      modelInput.value = result.model;
    } else {
      modelInput.value = providerInfo[apiProviderSelect.value].defaultModel;
    }
    if (result.systemPrompt) {
      systemPromptInput.value = result.systemPrompt;
    } else {
      systemPromptInput.value = 'Kamu adalah asisten yang membantu membuat balasan yang ramah dan profesional.';
    }
    
    updateProviderInfo();
  });
  
  // Update info saat provider berubah
  apiProviderSelect.addEventListener('change', () => {
    const provider = apiProviderSelect.value;
    modelInput.value = providerInfo[provider].defaultModel;
    updateProviderInfo();
  });
  
  function updateProviderInfo() {
    const provider = apiProviderSelect.value;
    const info = providerInfo[provider];
    
    apiInfo.innerHTML = `Dapatkan API key di <a href="${info.url}" target="_blank" style="color: #667eea;">${info.url}</a>`;
    modelInfo.textContent = `Models: ${info.models.join(', ')}`;
  }
  
  // Save settings
  saveBtn.addEventListener('click', () => {
    const provider = apiProviderSelect.value;
    const apiKey = apiKeyInput.value.trim();
    const systemPrompt = systemPromptInput.value.trim();
    const model = modelInput.value.trim();
    
    if (!apiKey) {
      showStatus('API Key tidak boleh kosong!', 'error');
      return;
    }
    
    if (!model) {
      showStatus('Model tidak boleh kosong!', 'error');
      return;
    }
    
    chrome.storage.sync.set({
      apiProvider: provider,
      apiKey: apiKey,
      systemPrompt: systemPrompt,
      model: model
    }, () => {
      showStatus('✅ Pengaturan berhasil disimpan!', 'success');
    });
  });
  
  function showStatus(message, type) {
    status.textContent = message;
    status.className = `status ${type}`;
    status.style.display = 'block';
    
    setTimeout(() => {
      status.style.display = 'none';
    }, 3000);
  }
});
