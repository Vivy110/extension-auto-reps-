let replyButton = null;
let selectedText = '';
let settings = {
  apiProvider: 'anthropic',
  apiKey: '',
  systemPrompt: 'Kamu adalah asisten yang membantu membuat balasan yang ramah dan profesional.',
  model: 'claude-sonnet-4-20250514'
};

// Load settings dari storage
chrome.storage.sync.get(['apiProvider', 'apiKey', 'systemPrompt', 'model'], (result) => {
  settings.apiProvider = result.apiProvider || 'anthropic';
  settings.apiKey = result.apiKey || '';
  settings.systemPrompt = result.systemPrompt || settings.systemPrompt;
  settings.model = result.model || 'claude-sonnet-4-20250514';
});

// Buat button reply
function createReplyButton() {
  if (replyButton) return replyButton;
  
  replyButton = document.createElement('div');
  replyButton.className = 'auto-reply-button';
  replyButton.innerHTML = `
    <button id="replyBtn">💬 Auto Reply</button>
    <div id="loadingIndicator" style="display:none;">⏳ Generating...</div>
  `;
  document.body.appendChild(replyButton);
  
  const btn = replyButton.querySelector('#replyBtn');
  btn.addEventListener('click', generateReply);
  
  return replyButton;
}

// Show button di posisi selection
function showReplyButton(x, y) {
  const button = createReplyButton();
  button.style.display = 'block';
  button.style.left = `${x}px`;
  button.style.top = `${y + 10}px`;
}

// Hide button
function hideReplyButton() {
  if (replyButton) {
    replyButton.style.display = 'none';
  }
}

// Generate reply menggunakan AI
async function generateReply() {
  if (!settings.apiKey) {
    alert('Silakan set API Key terlebih dahulu di extension popup!');
    return;
  }
  
  const btn = replyButton.querySelector('#replyBtn');
  const loading = replyButton.querySelector('#loadingIndicator');
  
  btn.style.display = 'none';
  loading.style.display = 'block';
  
  try {
    let reply = '';
    
    switch(settings.apiProvider) {
      case 'anthropic':
        reply = await generateWithAnthropic();
        break;
      case 'openai':
        reply = await generateWithOpenAI();
        break;
      case 'gemini':
        reply = await generateWithGemini();
        break;
      case 'groq':
        reply = await generateWithGroq();
        break;
      default:
        throw new Error('Provider tidak dikenal');
    }
    
    // Copy ke clipboard
    await navigator.clipboard.writeText(reply);
    
    // Show notification
    showNotification('✅ Balasan berhasil di-copy ke clipboard!');
    
    hideReplyButton();
  } catch (error) {
    console.error('Error:', error);
    showNotification('❌ Error: ' + error.message);
    btn.style.display = 'block';
    loading.style.display = 'none';
  }
}

// Generate dengan Anthropic Claude
async function generateWithAnthropic() {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': settings.apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: settings.model,
      max_tokens: 1024,
      system: settings.systemPrompt,
      messages: [{
        role: 'user',
        content: `Buatkan balasan untuk teks berikut:\n\n"${selectedText}"`
      }]
    })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || `API Error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.content[0].text;
}

// Generate dengan OpenAI
async function generateWithOpenAI() {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${settings.apiKey}`
    },
    body: JSON.stringify({
      model: settings.model,
      messages: [
        { role: 'system', content: settings.systemPrompt },
        { role: 'user', content: `Buatkan balasan untuk teks berikut:\n\n"${selectedText}"` }
      ],
      max_tokens: 1024
    })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || `API Error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
}

// Generate dengan Google Gemini
async function generateWithGemini() {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${settings.model}:generateContent?key=${settings.apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `${settings.systemPrompt}\n\nBuatkan balasan untuk teks berikut:\n\n"${selectedText}"`
        }]
      }],
      generationConfig: {
        maxOutputTokens: 1024
      }
    })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || `API Error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

// Generate dengan Groq
async function generateWithGroq() {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${settings.apiKey}`
    },
    body: JSON.stringify({
      model: settings.model,
      messages: [
        { role: 'system', content: settings.systemPrompt },
        { role: 'user', content: `Buatkan balasan untuk teks berikut:\n\n"${selectedText}"` }
      ],
      max_tokens: 1024
    })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || `API Error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'auto-reply-notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Event listener untuk text selection
document.addEventListener('mouseup', (e) => {
  setTimeout(() => {
    const selection = window.getSelection();
    const text = selection.toString().trim();
    
    if (text.length > 0) {
      selectedText = text;
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      showReplyButton(rect.left + rect.width / 2, rect.bottom + window.scrollY);
    } else {
      hideReplyButton();
    }
  }, 10);
});

// Hide button saat click di luar
document.addEventListener('mousedown', (e) => {
  if (replyButton && !replyButton.contains(e.target)) {
    hideReplyButton();
  }
});

// Listen untuk perubahan settings
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync') {
    if (changes.apiProvider) settings.apiProvider = changes.apiProvider.newValue;
    if (changes.apiKey) settings.apiKey = changes.apiKey.newValue;
    if (changes.systemPrompt) settings.systemPrompt = changes.systemPrompt.newValue;
    if (changes.model) settings.model = changes.model.newValue;
  }
});
