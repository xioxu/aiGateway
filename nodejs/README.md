# AI Gateway

一个轻量级 API 网关，用于转发请求到各种 AI 模型服务。目前支持 Claude 和 Grok 模型。

## 功能特点

- 支持转发请求到多种 AI 模型 API
- 简化的请求头处理，只传输必要信息
- 延长超时时间，避免大型请求超时
- 直接管道处理响应流

## 支持的模型

- Claude (Anthropic)
- Grok (X.AI)

## 安装

```bash
# 克隆仓库
git clone <repository-url>
cd aiGateway

# 安装依赖
npm install
```

## 使用方法

### 启动服务器

```bash
node index.js
```

服务器默认在 3008 端口启动。可以通过环境变量 `PORT` 来修改端口。

### API 使用方式

API 请求格式为：`/v1/{model}/{其他路径}`

例如：
- 向 Claude 发送请求：`/v1/claude/messages`
- 向 Grok 发送请求：`/v1/grok/chat/completions`

### 示例

向 Claude 发送请求：

```bash
curl -X POST http://localhost:3008/v1/claude/messages \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "model": "claude-3-opus-20240229",
    "messages": [
      {"role": "user", "content": "Hello, Claude!"}
    ],
    "max_tokens": 1000
  }'
```

## 配置

在 `index.js` 文件中可以配置支持的模型和对应的 API 端点：

```javascript
const BACKEND_API_MAP = {
  "grok": "https://api.x.ai",
  "claude": "https://api.anthropic.com"
};
```

## 注意事项

- 为确保安全，代理只转发 `authorization` 和内容相关的请求头
- 超时时间设置为 60 秒，适应大多数大型请求
- 本项目主要用于开发和测试目的 