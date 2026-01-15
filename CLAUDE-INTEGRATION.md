# 🤖 Using Text Checker as a Claude Skill

This guide shows you how to use the Bilingual Text Checker in any Claude conversation.

## Option 1: Direct API Access in Claude Conversations

Once you have your deployed URL, you can ask Claude to check text for you in any conversation.

### How to Use:

In any Claude chat, simply say:

```
Check this text for errors using my text checker at https://your-app.up.railway.app/api/check-text:

[paste your text here]
```

Claude will:
1. Call your API endpoint
2. Get the corrections
3. Show you the results with explanations

### Example Prompt:

```
Please check this English text for spelling, grammar, and punctuation errors by calling my API at https://your-app.up.railway.app/api/check-text:

"Their going too the store tommorow. Its very important."

Use a POST request with JSON body: {"text": "...", "language": "english"}
```

---

## Option 2: Claude Projects with Custom Instructions

Create a Claude Project with built-in text checking capabilities.

### Setup Steps:

1. **Create a New Project** in Claude
   - Click "Projects" in the sidebar
   - Click "Create Project"
   - Name it "Text Checker"

2. **Add Custom Instructions**

   In the project's custom instructions, add:

```
You have access to a bilingual text checker API that can check English and Slovak texts for errors.

API Endpoint: https://your-app.up.railway.app/api/check-text

When the user asks you to check text, automatically call this API with:
- Method: POST
- Headers: Content-Type: application/json
- Body: {"text": "the text to check", "language": "english" or "slovak"}

The API returns:
- correctedText: The fixed version
- corrections: Array of changes with type, original, corrected, explanation
- hasChanges: boolean

Always present the results in a clear, organized format showing:
1. The corrected text
2. A summary of corrections by type
3. Detailed explanations for each change

When checking text, be helpful and explain the corrections in simple terms.
```

3. **Use the Project**
   - Switch to this project
   - Now you can just say: "Check this text: [paste text]"
   - Claude will automatically use your API

---

## Option 3: MCP Server (Claude Desktop)

For Claude Desktop app users, you can create an MCP server for seamless integration.

### Create MCP Server:

1. **Create `mcp-text-checker.js`:**

```javascript
#!/usr/bin/env node

const API_URL = 'https://your-app.up.railway.app/api/check-text';

async function checkText(text, language = 'english') {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language })
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
}

// MCP server implementation
const server = {
    name: 'text-checker',
    version: '1.0.0',
    tools: [
        {
            name: 'check_text',
            description: 'Check English or Slovak text for spelling, grammar, punctuation, and clarity errors',
            parameters: {
                type: 'object',
                properties: {
                    text: {
                        type: 'string',
                        description: 'The text to check'
                    },
                    language: {
                        type: 'string',
                        enum: ['english', 'slovak'],
                        description: 'Language of the text',
                        default: 'english'
                    }
                },
                required: ['text']
            }
        }
    ]
};

async function handleToolCall(name, args) {
    if (name === 'check_text') {
        return await checkText(args.text, args.language || 'english');
    }
    throw new Error(`Unknown tool: ${name}`);
}

// Start MCP server
console.error('Text Checker MCP Server started');

// Read stdin for MCP protocol messages
process.stdin.on('data', async (data) => {
    try {
        const message = JSON.parse(data.toString());

        if (message.method === 'tools/list') {
            console.log(JSON.stringify({
                jsonrpc: '2.0',
                id: message.id,
                result: { tools: server.tools }
            }));
        } else if (message.method === 'tools/call') {
            const result = await handleToolCall(
                message.params.name,
                message.params.arguments
            );
            console.log(JSON.stringify({
                jsonrpc: '2.0',
                id: message.id,
                result
            }));
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
```

2. **Configure Claude Desktop**

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on Mac):

```json
{
  "mcpServers": {
    "text-checker": {
      "command": "node",
      "args": ["/path/to/your/mcp-text-checker.js"]
    }
  }
}
```

3. **Restart Claude Desktop**

Now Claude will have a "check_text" tool available automatically!

---

## Option 4: Browser Bookmarklet

Create a bookmarklet to check text from any webpage.

### Bookmarklet Code:

```javascript
javascript:(function(){
  const text = window.getSelection().toString() || prompt('Enter text to check:');
  if (!text) return;
  const lang = confirm('English? (Cancel for Slovak)') ? 'english' : 'slovak';
  fetch('https://your-app.up.railway.app/api/check-text', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({text, language: lang})
  })
  .then(r => r.json())
  .then(d => {
    const corrections = d.corrections.length;
    alert(`Found ${corrections} corrections!\n\nCorrected text:\n${d.correctedText}\n\nSee console for details.`);
    console.log('Full results:', d);
  })
  .catch(e => alert('Error: ' + e.message));
})();
```

**To use:**
1. Create a new bookmark
2. Paste the code above as the URL (replace with your actual URL)
3. Select text on any webpage
4. Click the bookmarklet
5. See corrections!

---

## Option 5: Quick Command Alias (Terminal)

For command-line users, create a quick alias.

### Add to your `~/.bashrc` or `~/.zshrc`:

```bash
# Text checker function
check-text() {
    local text="$1"
    local lang="${2:-english}"

    curl -s -X POST https://your-app.up.railway.app/api/check-text \
        -H "Content-Type: application/json" \
        -d "{\"text\":\"$text\",\"language\":\"$lang\"}" | jq .
}

# Usage:
# check-text "Your text here" english
# check-text "Váš text tu" slovak
```

Then you can check text from terminal:
```bash
check-text "Their going too the store"
```

---

## Best Practices

1. **Save Your URL**: Bookmark your deployed URL for quick access

2. **Create Project**: Make a Claude Project with custom instructions for this

3. **Share Wisely**: Your URL uses your API key, so only share with trusted people

4. **Monitor Usage**: Check your Anthropic API usage at console.anthropic.com

5. **Error Handling**: If you get errors, check:
   - Is your deployment running?
   - Is the API key set correctly?
   - Is the URL correct?

---

## Example Usage in Claude

Here's a full example conversation:

**You:**
```
Check this Slovak text:
"Dnes idem do obchoda. Musim si kupit chlieb a mlieko."
```

**Claude (with custom instructions):**
```
I'll check that Slovak text for you using your text checker API.

[Calls API...]

✅ Found 2 corrections:

CORRECTED TEXT:
"Dnes idem do obchoda. Musím si kúpiť chlieb a mlieko."

CORRECTIONS:
1. SPELLING: "Musim" → "Musím"
   Missing accent mark on í

2. SPELLING: "kupit" → "kúpiť"
   Missing accent mark on ú and incorrect ending

Both errors are common Slovak spelling mistakes related to missing diacritical marks (accents).
```

---

## Summary

Choose the method that works best for you:

- **Quick & Easy**: Use Option 1 (manual prompts)
- **Integrated**: Use Option 2 (Claude Projects)
- **Power User**: Use Option 3 (MCP Server)
- **Anywhere**: Use Option 4 (Bookmarklet)
- **Terminal**: Use Option 5 (Command Alias)

All methods give you the same great text checking results!
