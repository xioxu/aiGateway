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

## 许可证

MIT
