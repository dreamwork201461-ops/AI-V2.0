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
        // 在这里填入你的真实 API 密钥
        const apiKey = "AQ.Ab8RN6Ltge7NeeE3sX6MkDUel8dvkMvkXT0FCPYzQNfVPffy1g"; 
        
        const userMessage = req.body.message || "你好";
        
        // 必须使用 ?key= 拼在 URL 后面，Google 才会通过认证
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const apiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
