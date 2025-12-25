# Universal Auto Reply Extension

Extension Chrome yang mendukung berbagai AI API untuk auto reply di website manapun dengan pilihan bahasa dan multiple reply options.

## ✨ Fitur Utama

- 🌐 **Universal** - Bekerja di semua website
- 🤖 **Multi AI Provider** - Mendukung Anthropic Claude, OpenAI GPT, Google Gemini, dan Groq
- 🌍 **Multi Language** - Indonesia, English, Chinese (中文), Korean (한국어)
- 🎯 **3 Style Variations** - Formal, Casual, dan Creative
- 💬 **Preview Sebelum Copy** - Pilih reply terbaik sebelum di-copy
- ⚙️ **Customizable** - Atur model dan system prompt
- 📋 **Auto Copy** - Copy langsung ke clipboard
- 🎨 **Modern UI** - Tampilan yang clean dan profesional

## 🆕 Fitur Baru (v2.0)

### ✅ 1. Multi Language Support
Pilih bahasa output yang diinginkan:
- 🇮🇩 **Bahasa Indonesia** - Balasan dalam Bahasa Indonesia yang natural
- 🇺🇸 **English** - Natural English responses
- 🇨🇳 **中文 (Chinese)** - 自然的中文回复
- 🇰🇷 **한국어 (Korean)** - 자연스러운 한국어 응답

### ✅ 2. Multiple Reply Options
Generate 3 variasi balasan dengan style berbeda:
- **👔 Formal** - Gaya profesional dan formal
- **😊 Casual** - Gaya santai dan ramah  
- **🎨 Creative** - Gaya kreatif dan ekspresif

### ✅ 3. Preview Modal
- Lihat semua opsi balasan sebelum memilih
- Copy reply yang paling sesuai
- Generate ulang jika diperlukan
- UI yang smooth dengan animasi

### ✅ 4. Bug Fixes
- ✅ Fixed: Button reply tidak berfungsi setelah generate
- ✅ Fixed: Button muncul saat click di area yang tidak seharusnya
- ✅ Fixed: Modal tidak tertutup dengan baik

## 📁 Struktur File

```
auto-reply-extension/
├── manifest.json          # Konfigurasi extension
├── content.js            # Script utama (UPDATED)
├── style.css             # Styling untuk UI (UPDATED)
├── popup.html            # UI popup settings (UPDATED)
├── popup.js              # Logic untuk popup (UPDATED)
├── background.js         # Service worker background
├── icon16.png            # Icon 16x16px
├── icon48.png            # Icon 48x48px
├── icon128.png           # Icon 128x128px
└── README.md             # Dokumentasi
```

## 🚀 Cara Install

### 1. Download/Clone Extension

Buat folder baru dan copy semua file yang sudah diupdate

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

## ⚙️ Setup

### 1. Pilih AI Provider & Dapatkan API Key

#### Anthropic Claude (Recommended)
- Kunjungi: https://console.anthropic.com
- Model: `claude-sonnet-4-20250514`, `claude-opus-4-20250514`

#### OpenAI
- Kunjungi: https://platform.openai.com/api-keys
- Model: `gpt-4o`, `gpt-4o-mini`

#### Google Gemini
- Kunjungi: https://aistudio.google.com/app/apikey
- Model: `gemini-1.5-pro`, `gemini-1.5-flash`

#### Groq (Fastest & Free!)
- Kunjungi: https://console.groq.com/keys
- Model: `llama-3.3-70b-versatile`, `mixtral-8x7b-32768`

### 2. Setup di Extension

1. Klik icon extension di toolbar
2. Pilih **AI Provider**
3. Masukkan **API Key**
4. Pilih/edit **Model**
5. Pilih **Bahasa Output** (🇮🇩 🇺🇸 🇨🇳 🇰🇷)
6. Edit **System Prompt** (opsional)
7. Klik **"💾 Simpan Pengaturan"**

## 📖 Cara Pakai

### Basic Usage:
1. Buka website apa saja
2. **Select/highlight** teks yang ingin dibalas
3. Klik tombol **"💬 Auto Reply"** yang muncul
4. Tunggu beberapa detik (AI sedang generate 3 variasi)
5. **Modal akan muncul** dengan 3 pilihan balasan:
   - 👔 Formal
   - 😊 Casual
   - 🎨 Creative
6. **Review** setiap opsi
7. Klik **"📋 Copy"** pada reply yang paling sesuai
8. Balasan langsung ter-copy ke clipboard!
9. Paste di mana saja

### Advanced:
- Klik **"🔄 Generate Ulang"** jika ingin variasi baru
- Klik **"✕"** atau area luar modal untuk menutup
- Ganti bahasa output di settings untuk hasil berbeda

## 🎨 Customization

### System Prompt Examples

**Professional Email:**
```
Kamu adalah asisten profesional yang membuat balasan email bisnis yang sopan, efektif, dan to the point.
```

**Customer Service:**
```
Kamu adalah customer service yang empati dan membantu. Selalu berikan solusi dan tetap positif dalam setiap balasan.
```

**Social Media:**
```
Kamu adalah social media manager yang ramah dan engaging. Buat balasan yang menarik dan sesuai dengan tone casual.
```

**Technical Support:**
```
Kamu adalah technical support yang menjelaskan hal kompleks dengan cara yang mudah dipahami. Gunakan analogi jika perlu.
```

**Casual Friend:**
```
Kamu adalah teman yang santai dan supportive. Buat balasan yang hangat, friendly, dan natural.
```

## 🌍 Language Examples

### Indonesia 🇮🇩
**Input:** "Terima kasih atas bantuannya!"  
**Output:** "Sama-sama! Senang bisa membantu. Jangan ragu untuk kontak lagi jika butuh bantuan lainnya."

### English 🇺🇸
**Input:** "Thank you for your help!"  
**Output:** "You're welcome! Happy to help. Feel free to reach out if you need anything else."

### Chinese 🇨🇳
**Input:** "谢谢你的帮助！"  
**Output:** "不客气！很高兴能帮到你。如果还需要其他帮助，随时联系我。"

### Korean 🇰🇷
**Input:** "도움 주셔서 감사합니다!"  
**Output:** "천만에요! 도움이 되어 기쁩니다. 다른 도움이 필요하시면 언제든지 연락주세요."

## 🔧 Troubleshooting

### Button tidak muncul
- Pastikan extension sudah di-load
- Refresh halaman website
- Check console untuk error (`F12` → Console)

### Button tidak berfungsi setelah generate
- ✅ **FIXED** - Update ke versi terbaru
- Button akan otomatis ter-reset setelah generate selesai

### API Error
- Cek API key sudah benar
- Pastikan ada credit/quota
- Cek model name sesuai provider
- Lihat error message di notification

### Modal tidak muncul
- Cek console untuk error
- Pastikan tidak ada blocker/extension conflict
- Refresh page dan coba lagi

### Hasil tidak di-copy
- Klik tombol "📋 Copy" di modal
- Pastikan browser support clipboard API
- Try manual copy dengan Ctrl+C

## 💡 Pro Tips

1. **Groq** - Paling cepat (2-3 detik) & gratis, perfect untuk testing
2. **Claude** - Paling natural dan context-aware
3. **GPT-4** - Powerful tapi lebih mahal
4. **Gemini** - Balance speed & quality
5. **Sesuaikan System Prompt** untuk hasil yang lebih spesifik
6. **Pilih bahasa sesuai audience** - akan otomatis terdeteksi context
7. **Compare 3 variations** - pilih yang paling sesuai dengan situasi
8. **Generate ulang** jika belum puas dengan hasil

## 🎯 Use Cases

### Email Professional
- Pilih Bahasa: English/Indonesia
- Style: Formal
- Use Case: Balasan email bisnis

### Customer Support
- Pilih Bahasa: Sesuai customer
- Style: Casual/Formal (tergantung situation)
- Use Case: Support tickets, chat support

### Social Media
- Pilih Bahasa: Sesuai audience
- Style: Casual/Creative
- Use Case: Instagram, Twitter, Facebook comments

### International Communication
- Pilih Bahasa: English/中文/한국어
- Style: Formal
- Use Case: International business, cross-border communication

## 📊 Performa

| Provider | Speed | Quality | Cost | Best For |
|----------|-------|---------|------|----------|
| Groq | ⚡⚡⚡ | ⭐⭐⭐ | 💰 Free | Testing, Fast replies |
| Claude | ⚡⚡ | ⭐⭐⭐⭐⭐ | 💰💰 | Professional, Context-aware |
| GPT-4 | ⚡⚡ | ⭐⭐⭐⭐⭐ | 💰💰💰 | Complex tasks, High quality |
| Gemini | ⚡⚡⚡ | ⭐⭐⭐⭐ | 💰 Low | Balance speed & quality |

## 🔄 Version History

### v2.0 (Current)
- ✨ Added multi-language support (4 languages)
- ✨ Added 3 style variations (Formal, Casual, Creative)
- ✨ Added preview modal before copy
- ✨ Added regenerate function
- 🐛 Fixed button not working after generate
- 🐛 Fixed modal overlay issues
- 💎 Improved UI/UX

### v1.0
- Initial release
- Basic auto reply functionality
- Multi AI provider support

## 📝 Development

### Menambah Bahasa Baru

Edit `content.js`, tambah di `languagePrompts`:

```javascript
const languagePrompts = {
  id: 'Balas dalam Bahasa Indonesia...',
  en: 'Reply in natural English...',
  zh: '用自然的中文回复...',
  ko: '자연스러운 한국어로...',
  ja: '自然な日本語で返信してください。', // Tambah Japanese
  es: 'Responde en español natural...', // Tambah Spanish
};
```

Lalu update `popup.html` untuk tambah button bahasa baru.

## 📄 License

MIT License - bebas digunakan dan dimodifikasi

## 🙏 Credits

Dibuat dengan ❤️ with diva

## 🔗 Links

- [Anthropic Console](https://console.anthropic.com)
- [OpenAI Platform](https://platform.openai.com)
- [Google AI Studio](https://aistudio.google.com)
- [Groq Console](https://console.groq.com)

---

**Happy Auto Replying! 🚀**
