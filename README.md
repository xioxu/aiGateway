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

## License

MIT