// Instead of receiving the response, parsing it into
// json and then passing it to the render function
// like I did in solutions 1 & 2, I am going to 
// run fetchQuotes() once the fetch and
// handlers have completed, emulating Juliens code
// more closely. To maccomplish this I also had to
// implent a cleanup of the previous DOM on lines
// 16 and 17
document.addEventListener("DOMContentLoaded", () => {
    console.log("using the solution 3 js");
    fetchQuotes();
    submitQuote();
  });
  
  function fetchQuotes() {
    const list = document.getElementById("quote-list")
    list.innerHTML = ""
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
        .then((quote) => console.log("Sucessful POST", quote));
      fetchQuotes()
    });
  }
  