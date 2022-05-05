// Add the eventListener from inside the
// submitQuote function and invoke the function
// inside of the DOMContentLoaded event
document.addEventListener("DOMContentLoaded", () => {
  console.log("using the solution 2 js");
  fetchQuotes();
  submitQuote();
});

function fetchQuotes() {
  fetch("http://localhost:3000/quotes?_embed=likes")
    .then((res) => res.json())
    .then((data) => data.forEach((quote) => renderQuote(quote)));
}

function renderQuote(quote) {
  const ul = document.getElementById("quote-list");
  const li = document.createElement("li");
  li.className = "quote-card";
  const blockQuote = document.createElement("blockquote");
  blockQuote.className = "blockquote";
  const p = document.createElement("p");
  p.classList = "mb-0";
  p.innerText = quote.quote;
  const footer = document.createElement("footer");
  footer.className = "blockquote-footer";
  footer.innerText = quote.author;
  const br = document.createElement("br");
  const button = document.createElement("button");
  button.className = "btn-success";
  button.innerText = "Likes:";
  const span = document.createElement("span");
  button.append(span);
  const delButton = document.createElement("button");
  delButton.innerText = "Delete";
  blockQuote.append(p);
  blockQuote.append(footer);
  blockQuote.append(br);
  blockQuote.append(button);
  blockQuote.append(delButton);
  li.append(blockQuote);
  ul.append(li);
}

function submitQuote() {
  const form = document.getElementById("new-quote-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userQuoteInput = e.target.children[0].children[1].value;
    const userAuthorInput = e.target.children[1].children[1].value;
    const configObj = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
      },
      body: JSON.stringify({
        quote: userQuoteInput,
        author: userAuthorInput,
      }),
    };
    fetch("http://localhost:3000/quotes?_embed=likes", configObj)
      .then((res) => res.json())
      .then((quote) => renderQuote(quote));
  });
}
