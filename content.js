let replyButton = null;
let resultModal = null;
let selectedText = '';
let settings = {
  apiProvider: 'anthropic',
  apiKey: '',
  systemPrompt: 'Kamu adalah asisten yang membantu membuat balasan yang ramah dan profesional.',
  model: 'claude-sonnet-4-20250514',
  language: 'id'
};

// Load settings dari storage
chrome.storage.sync.get(['apiProvider', 'apiKey', 'systemPrompt', 'model', 'language'], (result) => {
  settings.apiProvider = result.apiProvider || 'anthropic';
  settings.apiKey = result.apiKey || '';
  settings.systemPrompt = result.systemPrompt || settings.systemPrompt;
  settings.model = result.model || 'claude-sonnet-4-20250514';
  settings.language = result.language || 'id';
});

// Language templates
const languagePrompts = {
  id: 'Balas dalam Bahasa Indonesia yang natural dan sesuai konteks.',
  en: 'Reply in natural English that fits the context.',
  zh: '用自然的中文回复，符合上下文。',
  ko: '맥락에 맞는 자연스러운 한국어로 답장하세요.'
};

// Buat button reply
function createReplyButton() {
  if (replyButton) {
    replyButton.remove();
    replyButton = null;
  }
  
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
    // Generate 3 variations
    const replies = await Promise.all([
      generateSingleReply('formal'),
      generateSingleReply('casual'),
      generateSingleReply('creative')
    ]);
    
    // Hide loading
    loading.style.display = 'none';
    btn.style.display = 'block';
    hideReplyButton();
    
    // Show result modal
    showResultModal(replies);
    
  } catch (error) {
    console.error('Error:', error);
    showNotification('❌ Error: ' + error.message);
    btn.style.display = 'block';
    loading.style.display = 'none';
  }
}

// Generate single reply dengan style tertentu
async function generateSingleReply(style) {
  const stylePrompts = {
    formal: 'Gaya formal dan profesional.',
    casual: 'Gaya santai dan ramah.',
    creative: 'Gaya kreatif dan ekspresif.'
  };
  
  const languagePrompt = languagePrompts[settings.language];
  const fullPrompt = `${settings.systemPrompt}\n\n${languagePrompt}\n${stylePrompts[style]}\n\nBuatkan balasan untuk teks berikut:\n\n"${selectedText}"`;
  
  let reply = '';
  
  switch(settings.apiProvider) {
    case 'anthropic':
      reply = await generateWithAnthropic(fullPrompt);
      break;
    case 'openai':
      reply = await generateWithOpenAI(fullPrompt);
      break;
    case 'gemini':
      reply = await generateWithGemini(fullPrompt);
      break;
    case 'groq':
      reply = await generateWithGroq(fullPrompt);
      break;
    default:
      throw new Error('Provider tidak dikenal');
  }
  
  return { style, reply };
}

// Show modal dengan pilihan reply
function showResultModal(replies) {
  // Remove existing modal if any
  if (resultModal) {
    resultModal.remove();
  }
  
  const modal = document.createElement('div');
  modal.className = 'auto-reply-modal';
  modal.innerHTML = `
    <div class="modal-overlay"></div>
    <div class="modal-content">
      <div class="modal-header">
        <h3>✨ Pilih Balasan</h3>
        <button class="close-btn">✕</button>
      </div>
      <div class="modal-body">
        ${replies.map((item, index) => `
          <div class="reply-option" data-index="${index}">
            <div class="reply-header">
              <span class="reply-badge">${getStyleLabel(item.style)}</span>
            </div>
            <div class="reply-text">${escapeHtml(item.reply)}</div>
            <button class="copy-btn" data-reply="${escapeHtml(item.reply)}">
              📋 Copy
            </button>
          </div>
        `).join('')}
      </div>
      <div class="modal-footer">
        <button class="regenerate-btn">🔄 Generate Ulang</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  resultModal = modal;
  
  // Event listeners
  modal.querySelector('.close-btn').addEventListener('click', closeModal);
  modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
  modal.querySelector('.regenerate-btn').addEventListener('click', () => {
    closeModal();
    generateReply();
  });
  
  modal.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const reply = e.target.getAttribute('data-reply');
      await copyToClipboard(reply);
      showNotification('✅ Berhasil di-copy ke clipboard!');
      closeModal();
    });
  });
  
  // Show modal with animation
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
}

function getStyleLabel(style) {
  const labels = {
    formal: '👔 Formal',
    casual: '😊 Santai',
    creative: '🎨 Kreatif'
  };
  return labels[style] || style;
}

function closeModal() {
  if (resultModal) {
    resultModal.classList.remove('show');
    setTimeout(() => {
      if (resultModal) {
        resultModal.remove();
        resultModal = null;
      }
    }, 300);
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    // Fallback method
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}

// Generate dengan Anthropic Claude
async function generateWithAnthropic(prompt) {
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
      messages: [{
        role: 'user',
        content: prompt
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
async function generateWithOpenAI(prompt) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${settings.apiKey}`
    },
    body: JSON.stringify({
      model: settings.model,
      messages: [
        { role: 'user', content: prompt }
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
async function generateWithGemini(prompt) {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${settings.model}:generateContent?key=${settings.apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
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
async function generateWithGroq(prompt) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${settings.apiKey}`
    },
    body: JSON.stringify({
      model: settings.model,
      messages: [
        { role: 'user', content: prompt }
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
  // Jangan show button jika click di dalam modal atau button
  if (resultModal || (replyButton && replyButton.contains(e.target))) {
    return;
  }
  
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
  if (replyButton && !replyButton.contains(e.target) && !resultModal) {
    const selection = window.getSelection();
    if (!selection.toString().trim()) {
      hideReplyButton();
    }
  }
});

// Listen untuk perubahan settings
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync') {
    if (changes.apiProvider) settings.apiProvider = changes.apiProvider.newValue;
    if (changes.apiKey) settings.apiKey = changes.apiKey.newValue;
    if (changes.systemPrompt) settings.systemPrompt = changes.systemPrompt.newValue;
    if (changes.model) settings.model = changes.model.newValue;
    if (changes.language) settings.language = changes.language.newValue;
  }
});
