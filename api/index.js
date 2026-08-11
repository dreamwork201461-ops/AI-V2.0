export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        // 请把双引号里的内容替换为你从 Google AI Studio 复制的真实 API 密钥
        const apiKey = "AQ.Ab8RN6JfIQPto5aOto1ih-ilzk84irxl4TgI49LC0JB_Sdjwog"; 
        
        const userMessage = req.body.message || "你好";
        
        // 使用标准的 x-goog-api-key 标头传递密钥，彻底解决 401 认证错误
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`;

        const apiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': apiKey
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: userMessage }] }]
            })
        });

        const data = await apiResponse.json();

        if (data.candidates && data.candidates.length > 0) {
            const replyText = data.candidates[0].content.parts[0].text;
            return res.status(200).json({
                code: 200,
                reply: replyText
            });
        } else {
            return res.status(500).json({
                code: 500,
                error: "AI 返回格式异常: " + JSON.stringify(data)
            });
        }

    } catch (error) {
        return res.status(500).json({
            code: 500,
            error: error.message
        });
    }
}
