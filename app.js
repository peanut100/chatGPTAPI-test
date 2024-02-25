document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("sentenceForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // フォームのデフォルト送信を阻止
    const sentenceInput = document.getElementById("sentenceInput").value;
    const answerElement = document.getElementById("answer");

    fetch("http://localhost:3001/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: sentenceInput }),
    })
      .then((response) => {
        console.log(response, "response"); // レスポンスオブジェクトをログに出力
        return response.json();
      })
      .then((data) => {
        console.log(data, "data");
        answerElement.textContent = data.message; // バックエンドからの応答を表示
      })
      .catch((error) => {
        console.error("Error:", error);
        answerElement.textContent =
          "エラーが発生しました。もう一度試してください。";
      });
  });
});
