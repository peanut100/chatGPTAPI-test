const express = require("express");
const { OpenAI } = require("openai");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI(process.env.OPENAI_API_KEY);
app.use(express.json());
app.post("/chat", async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: "あなたは褒め上手です。これから送られるメッセージに対して、すべて肯定的な意見を言い、褒めてください！メッセージに特に褒めるべき所がない場合でも生きているだけで偉い！みたいな感じで、すべてを肯定してください" + req.body.message,
        },
      ], // フロントエンドから送られてきたメッセージを使用
      stream: true,
    });

    let responseContent = "";
    for await (const chunk of response) {
      responseContent += chunk.choices[0]?.delta?.content || "";
    }

    // フロントエンドにレスポンスを送信
    res.json({ message: responseContent });
  } catch (error) {
    console.error("OpenAI APIの呼び出し中にエラーが発生しました。", error);
    res.status(500).send("OpenAI APIの呼び出し中にエラーが発生しました。");
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
