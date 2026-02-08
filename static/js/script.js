async function ask() {
  const input = document.getElementById("question");
  const chat = document.getElementById("chat");
  const q = input.value.trim();

  if (!q) return;

  chat.innerHTML += `
    <div class="message">
      <div class="user">You</div>
      <div class="ai">${q}</div>
    </div>
  `;

  input.value = "";
  chat.scrollTop = chat.scrollHeight;

  const res = await fetch("/ask", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ question: q })
  });

  const data = await res.json();

  chat.innerHTML += `
    <div class="message">
      <div class="user">Study Assistant</div>
      <div class="ai">${data.answer}</div>
    </div>
  `;

  chat.scrollTop = chat.scrollHeight;
}
