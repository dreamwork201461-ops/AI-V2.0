export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: "Method not allowed" });

    const GEMINI_API_KEY = "AQ.Ab8RN6JfIQPto5aOto1ih-ilzk84irxl4TgI49LC0JB_Sdjwog";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    const userMessage = req.body.message || "你好";

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: userMessage }] }]
        })
    })
    .then(r => r.json())
    .then(data => {
        const reply = data.candidates[0].content.parts[0].text;
        res.status(200).json({ code: 200, reply: reply });
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
}
