const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting configuration
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_REQUESTS_PER_WINDOW = 20; // 20 requests per hour per IP

// Optional password protection (set ACCESS_PASSWORD in .env to enable)
const ACCESS_PASSWORD = process.env.ACCESS_PASSWORD;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('.'));

// Rate limiting middleware
function rateLimitMiddleware(req, res, next) {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();

    // Clean up old entries
    for (const [key, value] of rateLimit.entries()) {
        if (now - value.firstRequest > RATE_LIMIT_WINDOW) {
            rateLimit.delete(key);
        }
    }

    // Check rate limit
    if (!rateLimit.has(ip)) {
        rateLimit.set(ip, { firstRequest: now, count: 1 });
        return next();
    }

    const userData = rateLimit.get(ip);

    // Reset if window has passed
    if (now - userData.firstRequest > RATE_LIMIT_WINDOW) {
        rateLimit.set(ip, { firstRequest: now, count: 1 });
        return next();
    }

    // Check if limit exceeded
    if (userData.count >= MAX_REQUESTS_PER_WINDOW) {
        const resetTime = new Date(userData.firstRequest + RATE_LIMIT_WINDOW);
        return res.status(429).json({
            error: 'Rate limit exceeded',
            message: `Too many requests. Please try again after ${resetTime.toLocaleTimeString()}.`,
            limit: MAX_REQUESTS_PER_WINDOW,
            resetAt: resetTime.toISOString()
        });
    }

    // Increment count
    userData.count++;
    next();
}

// Password middleware (optional)
function passwordMiddleware(req, res, next) {
    // Skip if no password is set
    if (!ACCESS_PASSWORD) {
        return next();
    }

    const providedPassword = req.headers['x-access-password'];

    if (providedPassword !== ACCESS_PASSWORD) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Invalid or missing access password'
        });
    }

    next();
}

// Initialize Anthropic client
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

// API endpoint for text checking
app.post('/api/check-text', rateLimitMiddleware, passwordMiddleware, async (req, res) => {
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
