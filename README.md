# AI Gateway

[中文文档](README_CN.md) | [English Documentation](README.md)

A unified AI service gateway supporting multiple deployment options:
- Node.js version: Located in the `nodejs` folder for self-hosted deployment
- Vercel version: Located in the project root for direct deployment to Vercel platform

## Features

- Unified AI service gateway
- Support for multiple deployment options
- Extensible architecture design
- Support for multiple AI providers (OpenAI, Claude, Grok, Gemini)

## Supported AI Providers

- **OpenAI**: `https://api.openai.com`
- **Claude (Anthropic)**: `https://api.anthropic.com`
- **Grok (xAI)**: `https://api.x.ai`
- **Gemini (Google)**: `https://generativelanguage.googleapis.com`

## Deployment Options

### 1. Node.js Server Deployment (Self-hosted)

#### System Requirements
- Node.js (v14 or higher)
- npm or yarn

#### Installation Steps
1. Clone the repository:
```bash
git clone https://github.com/yourusername/aiGateway.git
cd aiGateway/nodejs
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the service:
```bash
npm start
# or
yarn start
```

The service will run on port 3008 by default.

### 2. Vercel Deployment

#### System Requirements
- Vercel account
- GitHub account (for automatic deployment)

#### Deployment Steps
1. Fork this project to your GitHub account
2. Import the project in Vercel
3. Click deploy

### 3. API Access URLs

After deployment, you can use `https://your-project-name.vercel.app/v1/{model}` as the base URL.

For example:
- `https://your-project-name.vercel.app/v1/grok` maps to `https://api.x.ai`
- `https://your-project-name.vercel.app/v1/claude` maps to `https://api.anthropic.com`
- `https://your-project-name.vercel.app/v1/gemini` maps to `https://generativelanguage.googleapis.com`

URL Examples:
```
https://your-project-name.vercel.app/v1/grok/v1/models

https://your-project-name.vercel.app/v1/claude/messages

https://your-project-name.vercel.app/v1/gemini/v1beta/models
```

## Usage

The gateway automatically forwards requests to the appropriate AI provider based on the model parameter in the URL. All necessary headers (authorization, x-api-key, etc.) are preserved and forwarded.

### API Examples

#### 1. OpenAI Compatible Chat Completions (Gemini)

```bash
curl "https://your-project-name.vercel.app/v1/gemini/v1beta/openai/chat/completions" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $GEMINI_API_KEY" \
-d '{
    "model": "gemini-2.5-pro",
    "messages": [
        {"role": "user", "content": "Explain to me how AI works"}
    ]
}'
```

#### 2. Native Gemini Generate Content

```bash
curl "https://your-project-name.vercel.app/v1/gemini/v1beta/models/gemini-2.5-flash:generateContent" \
-H "x-goog-api-key: $GEMINI_API_KEY" \
-H "Content-Type: application/json" \
-X POST \
-d '{
    "contents": [
        {
            "parts": [
                {
                    "text": "Explain how AI works in a few words"
                }
            ]
        }
    ]
}'
```

#### 3. Claude API Example

```bash
curl "https://your-project-name.vercel.app/v1/claude/messages" \
-H "Content-Type: application/json" \
-H "x-api-key: $CLAUDE_API_KEY" \
-H "anthropic-version: 2023-06-01" \
-d '{
    "model": "claude-3-sonnet-20240229",
    "max_tokens": 1024,
    "messages": [
        {"role": "user", "content": "Hello, Claude!"}
    ]
}'
```

#### 4. Grok API Example

```bash
curl "https://your-project-name.vercel.app/v1/grok/v1/chat/completions" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $GROK_API_KEY" \
-d '{
    "model": "grok-beta",
    "messages": [
        {"role": "user", "content": "What is the meaning of life?"}
    ]
}'
```

### Environment Variables

Make sure to set the following environment variables:

- `GEMINI_API_KEY`: Your Google Gemini API key
- `CLAUDE_API_KEY`: Your Anthropic Claude API key  
- `GROK_API_KEY`: Your xAI Grok API key
- `OPENAI_API_KEY`: Your OpenAI API key

## License

MIT