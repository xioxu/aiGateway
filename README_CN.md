# AI Gateway

[English Documentation](README.md) | [中文文档](README_CN.md)

统一的 AI 服务网关，支持多种部署方式：
- Node.js 版本：位于 `nodejs` 文件夹，用于自托管部署
- Vercel 版本：位于项目根目录，用于直接部署到 Vercel 平台

## 功能特点

- 统一的 AI 服务网关
- 支持多种部署方式
- 可扩展的架构设计
- 支持多个 AI 提供商（OpenAI、Claude、Grok、Gemini）

## 支持的 AI 提供商

- **OpenAI**: `https://api.openai.com`
- **Claude (Anthropic)**: `https://api.anthropic.com`
- **Grok (xAI)**: `https://api.x.ai`
- **Gemini (Google)**: `https://generativelanguage.googleapis.com`

## 部署选项

### 1. Node.js 服务器部署（自托管版本）

#### 系统要求
- Node.js (v14 或更高版本)
- npm 或 yarn

#### 安装步骤
1. 克隆仓库：
```bash
git clone https://github.com/yourusername/aiGateway.git
cd aiGateway/nodejs
```

2. 安装依赖：
```bash
npm install
# 或
yarn install
```

3. 启动服务：
```bash
npm start
# 或
yarn start
```

服务默认运行在 3008 端口。

### 2. Vercel 部署

#### 系统要求
- Vercel 账号
- GitHub 账号（用于自动部署）

#### 部署步骤
1. Fork 本项目到你的 GitHub 账号
2. 在 Vercel 中导入项目
3. 点击部署

### 3. API 访问地址

部署后可以使用 `https://your-project-name.vercel.app/v1/{model}` 作为基础 URL。

例如：
- `https://your-project-name.vercel.app/v1/grok` 对应 `https://api.x.ai`
- `https://your-project-name.vercel.app/v1/claude` 对应 `https://api.anthropic.com`
- `https://your-project-name.vercel.app/v1/gemini` 对应 `https://generativelanguage.googleapis.com`

URL 示例：
```
https://your-project-name.vercel.app/v1/grok/v1/models

https://your-project-name.vercel.app/v1/claude/messages

https://your-project-name.vercel.app/v1/gemini/v1beta/models
```

## 使用方法

网关会根据 URL 中的模型参数自动将请求转发到相应的 AI 提供商。所有必要的请求头（authorization、x-api-key 等）都会被保留并转发。

### API 示例

#### 1. OpenAI 兼容的聊天完成接口（Gemini）

```bash
curl "https://your-project-name.vercel.app/v1/gemini/v1beta/openai/chat/completions" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $GEMINI_API_KEY" \
-d '{
    "model": "gemini-2.5-pro",
    "messages": [
        {"role": "user", "content": "请向我解释人工智能是如何工作的"}
    ]
}'
```

#### 2. 原生 Gemini 生成内容接口

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
                    "text": "请用几句话解释人工智能的工作原理"
                }
            ]
        }
    ]
}'
```

#### 3. Claude API 示例

```bash
curl "https://your-project-name.vercel.app/v1/claude/messages" \
-H "Content-Type: application/json" \
-H "x-api-key: $CLAUDE_API_KEY" \
-H "anthropic-version: 2023-06-01" \
-d '{
    "model": "claude-3-sonnet-20240229",
    "max_tokens": 1024,
    "messages": [
        {"role": "user", "content": "你好，Claude！"}
    ]
}'
```

#### 4. Grok API 示例

```bash
curl "https://your-project-name.vercel.app/v1/grok/v1/chat/completions" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $GROK_API_KEY" \
-d '{
    "model": "grok-beta",
    "messages": [
        {"role": "user", "content": "生命的意义是什么？"}
    ]
}'
```

### 环境变量

请确保设置以下环境变量：

- `GEMINI_API_KEY`: 你的 Google Gemini API 密钥
- `CLAUDE_API_KEY`: 你的 Anthropic Claude API 密钥  
- `GROK_API_KEY`: 你的 xAI Grok API 密钥
- `OPENAI_API_KEY`: 你的 OpenAI API 密钥

## 许可证

MIT
