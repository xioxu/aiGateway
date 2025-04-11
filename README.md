# AI Gateway

AI 服务网关，支持两种部署方式：
- Node.js 版本：位于 `nodejs` 文件夹，用于部署到自己的服务器
- Vercel 版本：位于项目根目录，用于直接部署到 Vercel 平台

## 功能特点

- 统一的 AI 服务网关
- 支持多种部署方式
- 可扩展的架构设计

## 部署选项

### 1. Node.js 服务器部署（自部署版本）

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


### 2. Vercel 部署

#### 系统要求
- Vercel 账号
- GitHub 账号（用于自动部署）

#### 部署步骤
1. Fork 本项目到你的 GitHub 账号
2. 在 Vercel 中导入项目
3. 点击部署

### 3. API 访问地址
部署后可以使用https://your-project-name.vercel.app/v1/{model}作为base地址.

例如 https://your-project-name.vercel.app/v1/grok  对应  https://api.x.ai

https://your-project-name.vercel.app/v1/claude  对应  https://api.anthropic.com

URL示例：
```
https://your-project-name.vercel.app/v1/grok/v1/models

https://your-project-name.vercel.app/v1/claude/messages
```

## 许可证

MIT