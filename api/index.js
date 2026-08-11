export default function handler(req, res) {
    // 设置跨域头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 无论是 GET 还是 POST，都返回成功
    return res.status(200).json({
        code: 200,
        success: true,
        reply: "太棒了！后端运行完全正常！"
    });
}
