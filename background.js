// Background service worker untuk extension
chrome.runtime.onInstalled.addListener(() => {
  console.log('Universal Auto Reply Extension installed!');
  
  // Set default settings
  chrome.storage.sync.get(['apiProvider', 'systemPrompt', 'model'], (result) => {
    if (!result.apiProvider) {
      chrome.storage.sync.set({
        apiProvider: 'anthropic',
        systemPrompt: 'Kamu adalah asisten yang membantu membuat balasan yang ramah dan profesional.',
        model: 'claude-sonnet-4-20250514'
      });
    }
  });
});

// Listen untuk messages dari content script (jika diperlukan)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSettings') {
    chrome.storage.sync.get(['apiProvider', 'apiKey', 'systemPrompt', 'model'], (result) => {
      sendResponse(result);
    });
    return true; // Required for async response
  }
});
