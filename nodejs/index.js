const express = require('express');
const request = require('request');

const BACKEND_API_MAP = {
  "grok": "https://api.x.ai",
  "claude": "https://api.anthropic.com",
  "openai": "https://api.openai.com",
  "gemini": "https://generativelanguage.googleapis.com"
};

const app = express();
app.use(express.json({ limit: '50mb' }));

app.all('/v1/:model/*', (req, res) => {
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

    if (req.headers['anthropic-version']) {
      headers['anthropic-version'] = req.headers['anthropic-version'];
    }

    const requestOptions = {
      url: backendUrl,
      method: req.method,
      headers: headers,
      followRedirect: true,
      timeout: 60000, // 增加超时时间到60秒
    };

    // 如果有 body，添加
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      requestOptions.body = JSON.stringify(req.body);
    }

    // 创建请求并直接 pipe
    const backendRequest = request(requestOptions);

    // 处理响应
    backendRequest
      .on('response', (backendResponse) => {
        // 设置状态码和头
        res.status(backendResponse.statusCode);
        Object.keys(backendResponse.headers).forEach(key => {
          res.setHeader(key, backendResponse.headers[key]);
        });
      })
      .on('error', (err) => {
        console.error('Request error:', {
          message: err.message,
          code: err.code,
          url: backendUrl
        });
        if (!res.headersSent) {
          res.status(502).send({
            error: 'Backend Connection Error',
            message: err.message,
            code: err.code
          });
        }
      })
      .pipe(res); // 直接 pipe 到响应

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

const PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});