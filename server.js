const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('.'));

// Initialize Anthropic client
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

// API endpoint for text checking
app.post('/api/check-text', async (req, res) => {
    try {
        const { text, language } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({ error: 'Text is required' });
        }

        if (!language) {
            return res.status(400).json({ error: 'Language is required' });
        }

        const languageName = language === 'english' ? 'English' : 'Slovak';

        // Create prompt for Claude
        const prompt = `You are an expert ${languageName} language editor. Analyze the following text for:
1. Spelling errors
2. Grammatical mistakes
3. Punctuation errors
4. Clarity improvements

Text to analyze:
"""
${text}
"""

Please provide:
1. A corrected version of the entire text
2. A detailed list of all corrections made

Format your response as JSON with this exact structure:
{
    "correctedText": "the full corrected text here",
    "corrections": [
        {
            "type": "spelling|grammar|punctuation|clarity",
            "original": "the original incorrect text",
            "corrected": "the corrected text",
            "explanation": "explanation of why this change was made",
            "context": "a few words of context around the error"
        }
    ]
}

If the text has no errors, return:
{
    "correctedText": "same as original",
    "corrections": []
}

IMPORTANT: Return ONLY the JSON object, no additional text or explanation.`;

        // Call Claude API
        const message = await anthropic.messages.create({
            model: 'claude-sonnet-4-5-20250929',
            max_tokens: 4096,
            messages: [{
                role: 'user',
                content: prompt
            }]
        });

        // Parse Claude's response
        let responseText = message.content[0].text;

        // Remove markdown code blocks if present
        responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

        let result;
        try {
            result = JSON.parse(responseText);
        } catch (parseError) {
            console.error('Failed to parse Claude response:', responseText);
            return res.status(500).json({
                error: 'Failed to parse AI response',
                details: parseError.message
            });
        }

        // Add positions for highlighting (find each correction in the original text)
        if (result.corrections && result.corrections.length > 0) {
            result.corrections = result.corrections.map(correction => {
                // Try to find the position of the original text
                let position = text.indexOf(correction.original);

                // If not found directly, try with the context
                if (position === -1 && correction.context) {
                    const contextPos = text.indexOf(correction.context);
                    if (contextPos !== -1) {
                        position = text.indexOf(correction.original, contextPos);
                    }
                }

                return {
                    ...correction,
                    position: position !== -1 ? position : 0
                };
            });

            result.hasChanges = true;
        } else {
            result.hasChanges = false;
        }

        res.json(result);

    } catch (error) {
        console.error('Error checking text:', error);
        res.status(500).json({
            error: 'Failed to check text',
            details: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n✨ Bilingual Text Checker Server`);
    console.log(`📍 Server running on http://localhost:${PORT}`);
    console.log(`🔗 Open http://localhost:${PORT} in your browser\n`);
});
