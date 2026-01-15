# 📝 Bilingual Text Checker

An AI-powered web application that checks English and Slovak texts for spelling, grammatical, punctuation errors, and clarity improvements. Built with Claude AI for accurate, context-aware corrections.

## ✨ Features

- **Bilingual Support**: Check texts in both English and Slovak
- **Comprehensive Analysis**: Detects spelling, grammar, punctuation, and clarity issues
- **Visual Highlighting**: See corrections highlighted directly in the text
- **Detailed Explanations**: Understand why each correction was made
- **Side-by-Side View**: Compare original and corrected text easily
- **User-Friendly Interface**: Clean, modern design with responsive layout
- **Keyboard Shortcuts**: Use Ctrl/Cmd + Enter to check text quickly

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Anthropic API key (get one at [console.anthropic.com](https://console.anthropic.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bilingual-text-checker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Anthropic API key:
   ```env
   ANTHROPIC_API_KEY=your_actual_api_key_here
   PORT=3000
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open the application**

   Navigate to `http://localhost:3000` in your web browser

## 📖 Usage

1. **Select Language**: Choose English or Slovak from the dropdown menu
2. **Paste Text**: Enter or paste your text in the left panel
3. **Check Text**: Click the "Check Text" button or press Ctrl/Cmd + Enter
4. **Review Results**:
   - The corrected text appears in the right panel with highlights
   - Scroll down to see detailed explanations of each correction
5. **Clear**: Use the "Clear" button to start over

## 🎨 Correction Types

The app identifies and color-codes different types of errors:

- 🔴 **Grammar** - Grammatical mistakes and syntax errors
- 🟡 **Spelling** - Misspelled words and typos
- 🔵 **Punctuation** - Missing or incorrect punctuation
- 🟢 **Clarity** - Suggestions for clearer, more effective writing

## 🏗️ Project Structure

```
bilingual-text-checker/
├── index.html          # Frontend UI
├── server.js           # Express backend server
├── package.json        # Dependencies and scripts
├── .env               # Environment variables (create this)
├── .env.example       # Environment template
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## 🔧 Configuration

### Environment Variables

- `ANTHROPIC_API_KEY` - Your Anthropic API key (required)
- `PORT` - Server port (default: 3000)

### API Endpoints

- `GET /` - Serves the frontend application
- `POST /api/check-text` - Text checking endpoint
  - Body: `{ "text": "string", "language": "english|slovak" }`
  - Returns: `{ "correctedText": "string", "corrections": [...], "hasChanges": boolean }`
- `GET /api/health` - Health check endpoint

## 🛠️ Development

### Running in Development Mode

```bash
npm run dev
```

### Testing

Test the application with sample texts:

**English Example:**
```
Their going too the store tommorow. Its important that they remembers to bring the shopping list
```

**Slovak Example:**
```
Dnes idem do obchoda. Musim si kúpit chlieb, mlieko a vajicka.
```

## 🔒 Security Notes

- Never commit your `.env` file to version control
- Keep your Anthropic API key secure
- The server includes CORS protection
- Input is limited to 10MB to prevent abuse

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## ⚡ Performance Tips

- For best results, check text in paragraphs rather than entire documents
- The app works best with texts up to ~5000 words
- Multiple small checks are faster than one large check

## 🐛 Troubleshooting

**"Failed to check text" error:**
- Verify your API key is correctly set in `.env`
- Check your internet connection
- Ensure the Anthropic API is accessible

**Server won't start:**
- Make sure port 3000 is not in use
- Check that all dependencies are installed
- Verify Node.js version is 14 or higher

**No corrections shown:**
- This means your text has no errors - great job!
- Try testing with intentional errors to verify functionality

## 📞 Support

For issues, questions, or suggestions, please open an issue in the GitHub repository.

---

Built with ❤️ using Claude AI by Anthropic
