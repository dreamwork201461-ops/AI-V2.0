export default function handler(req, res) {
    // 1. 设置跨域头，只允许你的 Wikidot 站点安全访问
    res.setHeader('Access-Control-Allow-Origin', 'https://mc-anomaly-archives.wikidot.com');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 处理预检请求
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 2. 仅允许 POST 请求
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            status: "error", 
            message: "Method not allowed" 
        });
    }

    try {
        // 获取前端发过来的数据
        const { action, data } = req.body;

        // 3. 这里写你自己的完全自主逻辑
        let responseMessage = "";
        
        if (action === "ping") {
            responseMessage = "系统运行正常，自主后端连接成功！";
        } else if (action === "process") {
            // 你可以在这里加入自定义的文本处理、数据校验或业务逻辑
            responseMessage = `成功接收并处理数据: ${data || "无内容"}`;
        } else {
            responseMessage = "收到未知指令，但后端运行良好。";
        }

        // 4. 返回标准 JSON 数据
        return res.status(200).json({
            code: 200,
            success: true,
            reply: responseMessage,
            timestamp: Date.now()
        });

    } catch (error) {
        return res.status(500).json({
            code: 500,
            success: false,
            error: error.message
        });
    }
}
