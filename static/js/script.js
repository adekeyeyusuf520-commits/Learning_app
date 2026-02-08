async function ask() {
  const q = document.getElementById("question").value;

  const res = await fetch("/ask", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ question: q })
  });

  const data = await res.json();

  const chat = document.getElementById("chat");
  chat.textContent += `\nYou: ${q}\nAI: ${data.answer}\n`;
}
