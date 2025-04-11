const express = require('express');
const fetch = require('node-fetch');

const BACKEND_API_MAP = {
  "grok": "https://api.x.ai",
  "claude": "https://api.anthropic.com"
};

const app = express();
app.use(express.json());

app.all('/v1/:model/*', async (req, res) => {
  try {
    const model = req.params.model.toLowerCase();
    const extraPath = req.params[0] || '';
    const baseBackendUrl = BACKEND_API_MAP[model];
    
    if (!baseBackendUrl) {
      return res.status(404).send(`Unsupported model: ${model}`);
    }

    const backendUrl = `${baseBackendUrl}/${extraPath}`.replace(/\/+$/, '');
    
    // 只保留关键头部
    const headers = { 
      'content-type': 'application/json',
      'accept': '*/*'
    };
    
    // 只保留 authorization 和 x-api-key 头
    if (req.headers.authorization) {
      headers.authorization = req.headers.authorization;
    }
    
    if (req.headers['x-api-key']) {
      headers['x-api-key'] = req.headers['x-api-key'];
    }

    const requestOptions = {
      method: req.method,
      headers: headers,
      redirect: 'follow',
      timeout: 60000
    };

    // 如果有 body，添加
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      requestOptions.body = JSON.stringify(req.body);
    }

    const response = await fetch(backendUrl, requestOptions);
    
    // 设置状态码和头
    res.status(response.status);
    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }

    // 流式传输响应
    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
    res.end();

  } catch (error) {
    console.error('Proxy error:', {
      message: error.message,
      stack: error.stack,
      url: req.url
    });
    if (!res.headersSent) {
      res.status(500).send({
        error: 'Internal Server Error',
        message: error.message
      });
    }
  }
});

app.all('*', (req, res) => {
  res.status(400).send('Invalid URL format. Expected: /v1/{model}');
});

// 导出 Vercel 处理函数
module.exports = app; 