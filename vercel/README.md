# AI Gateway (Vercel Version)

这是一个运行在 Vercel 平台上的 AI Gateway 服务，用于代理访问不同的 AI API。

## 功能特点

- 支持多个 AI 模型 API 的代理访问
- 自动转发请求头和认证信息
- 流式响应支持
- 错误处理和日志记录

## 支持的模型

- Grok (x.ai)
- Claude (Anthropic)

## 使用方法

1. 部署到 Vercel：
   ```bash
   vercel deploy
   ```

2. API 调用格式：
   ```
   /v1/{model}/{path}
   ```

   例如：
   - `/v1/claude/v1/messages`
   - `/v1/grok/v1/chat/completions`

3. 请求头：
   - `Authorization`: 用于认证的 Bearer token
   - `x-api-key`: API 密钥（如果需要）

## 开发

本地开发：
```bash
npm install
npm run dev
```

## 环境变量

无需特殊环境变量配置。

## 注意事项

- 确保在 Vercel 项目中配置了正确的环境变量（如果需要）
- 建议设置适当的请求超时时间
- 注意 API 调用频率限制 