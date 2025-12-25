# Universal Auto Reply Extension

Extension Chrome yang mendukung berbagai AI API untuk auto reply di website manapun.

## ✨ Fitur

- 🌐 **Universal** - Bekerja di semua website
- 🤖 **Multi AI Provider** - Mendukung:
  - Anthropic Claude
  - OpenAI GPT
  - Google Gemini
  - Groq
- 💬 **Auto Reply** - Generate balasan otomatis dengan AI
- ⚙️ **Customizable** - Atur model dan system prompt
- 📋 **Auto Copy** - Hasil langsung di-copy ke clipboard
- 🎨 **Modern UI** - Tampilan yang clean dan profesional

## 📁 Struktur File

```
auto-reply-extension/
├── manifest.json          # Konfigurasi extension
├── content.js            # Script yang berjalan di semua website
├── style.css             # Styling untuk button dan notification
├── popup.html            # UI popup settings
├── popup.js              # Logic untuk popup settings
├── background.js         # Service worker background
├── icon16.png            # Icon 16x16px
├── icon48.png            # Icon 48x48px
├── icon128.png           # Icon 128x128px
└── README.md             # Dokumentasi
```

## 🚀 Cara Install

### 1. Download/Clone Extension

Buat folder baru dan copy semua file:
- `manifest.json`
- `content.js`
- `style.css`
- `popup.html`
- `popup.js`
- `background.js`

### 2. Buat Icon (Optional)

Buat 3 file icon atau download dari [Flaticon](https://www.flaticon.com):
- `icon16.png` (16x16px)
- `icon48.png` (48x48px)
- `icon128.png` (128x128px)

### 3. Load Extension ke Browser

**Chrome/Edge:**
1. Buka `chrome://extensions`
2. Aktifkan "Developer mode" (toggle di kanan atas)
3. Klik "Load unpacked"
4. Pilih folder extension

**Brave:**
1. Buka `brave://extensions`
2. Aktifkan "Developer mode"
3. Klik "Load unpacked"
4. Pilih folder extension

## ⚙️ Setup API Key

### 1. Pilih AI Provider & Dapatkan API Key

#### Anthropic Claude
- Kunjungi: https://console.anthropic.com
- Buat akun dan generate API key
- Model: `claude-sonnet-4-20250514`, `claude-opus-4-20250514`

#### OpenAI
- Kunjungi: https://platform.openai.com/api-keys
- Buat API key
- Model: `gpt-4o`, `gpt-4o-mini`, `gpt-3.5-turbo`

#### Google Gemini
- Kunjungi: https://aistudio.google.com/app/apikey
- Generate API key
- Model: `gemini-1.5-pro`, `gemini-1.5-flash`

#### Groq
- Kunjungi: https://console.groq.com/keys
- Buat API key (gratis & cepat!)
- Model: `llama-3.3-70b-versatile`, `mixtral-8x7b-32768`

### 2. Setup di Extension

1. Klik icon extension di toolbar
2. Pilih **AI Provider**
3. Masukkan **API Key**
4. Pilih/edit **Model** (sudah ada default)
5. Edit **System Prompt** (opsional)
6. Klik **"💾 Simpan Pengaturan"**

## 📖 Cara Pakai

1. Buka website apa saja
2. **Select/highlight** teks yang ingin dibalas
3. Klik tombol **"💬 Auto Reply"** yang muncul
4. Tunggu beberapa detik
5. Balasan otomatis akan **di-copy ke clipboard**!
6. Paste di mana saja

## 🎨 Customization

### System Prompt Examples

**Professional:**
```
Kamu adalah asisten profesional yang membuat balasan email bisnis yang sopan dan efektif.
```

**Casual:**
```
Kamu adalah teman yang santai dan ramah. Buat balasan yang casual tapi tetap sopan.
```

**Customer Service:**
```
Kamu adalah customer service yang empati dan membantu. Selalu berikan solusi dan tetap positif.
```

**Technical:**
```
Kamu adalah technical support yang menjelaskan hal kompleks dengan cara yang mudah dipahami.
```

## 🔧 Troubleshooting

### Button tidak muncul
- Pastikan extension sudah di-load
- Refresh halaman website
- Check console untuk error (`F12` → Console)

### API Error
- Cek API key sudah benar
- Pastikan ada credit/quota
- Cek model name sudah benar
- Lihat error message di notification

### Hasil tidak di-copy
- Pastikan browser support clipboard API
- Klik "Allow" jika ada permission popup

## 💡 Tips

1. **Groq** sangat cepat dan gratis - cocok untuk testing
2. **Claude** bagus untuk balasan yang natural
3. **GPT-4** powerful tapi lebih mahal
4. **Gemini** balance antara speed dan quality
5. Sesuaikan **system prompt** untuk hasil terbaik

## 📝 Development

### Struktur Code

- `content.js` - Main logic untuk selection & AI generation
- `popup.js` - Settings UI logic
- `background.js` - Service worker (minimal)
- `style.css` - Styling

### Menambah AI Provider Baru

Edit `content.js` dan tambah function baru:

```javascript
async function generateWithNewAI() {
  const response = await fetch('https://api.newai.com/endpoint', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${settings.apiKey}`
    },
    body: JSON.stringify({
      prompt: selectedText
    })
  });
  
  const data = await response.json();
  return data.response;
}
```

Lalu tambah case di `generateReply()`:

```javascript
case 'newai':
  reply = await generateWithNewAI();
  break;
```

## 📄 License

MIT License - bebas digunakan dan dimodifikasi

## 🙏 Credits

Dibuat dengan ❤️ 

## 🔗 Links

- [Anthropic Console](https://console.anthropic.com)
- [OpenAI Platform](https://platform.openai.com)
- [Google AI Studio](https://aistudio.google.com)
- [Groq Console](https://console.groq.com)

---

**Happy Auto Replying! 🚀**
