const express = require("express");
const { OpenAI } = require("openai");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI(process.env.OPENAI_API_KEY);
app.post("/chat", async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: req.body.message,
        },
      ],
      stream: true,
    });

    let responseContent = "";
    for await (const chunk of response) {
      console.log(response, "response");
      responseContent += chunk.choices[0]?.delta?.content || "";
      console.log(responseContent, "responseContent");
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
  // console.log(`Server is running on http://localhost:${PORT}`);
});
