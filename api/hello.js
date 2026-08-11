// api/hello.js
export default function handler(req, res) {
  // 1. 设置跨域，只允许你的 Wikidot 站点访问
  res.setHeader('Access-Control-Allow-Origin', 'https://mc-anomaly-archives.wikidot.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 2. 这里写你的核心逻辑
  if (req.method === 'POST') {
    const { prompt } = req.body;
    // 调用你朋友那个 API 的逻辑放在这里，或者你自己封装 AI 调用
    res.status(200).json({ reply: "已处理: " + prompt });
  } else {
    res.status(405).json({ error: "只允许 POST 请求" });
  }
}
