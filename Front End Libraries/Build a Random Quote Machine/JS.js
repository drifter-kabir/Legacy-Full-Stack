const quotes = [{
  text: "kajshfsadfhb",
  author: "fgnh"
}, {
  text: "efkhgj",
  author: "gbr"
}, {
  text: "gjhrgj",
  author: "jkkk"
}]

const textDiv = document.getElementById('text');
const authorDiv = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const tweetBtn = document.getElementById('tweet-quote');
let currentRnd = -1;

function fetchQuote() {
  let rnd;
  do {
    rnd = Math.floor(Math.random() * quotes.length)
  } while (currentRnd === rnd)
  
  currentRnd = rnd;
  
  textDiv.innerHTML = quotes[rnd].text;
  authorDiv.innerHTML = quotes[rnd].author;
  
  tweetBtn.setAttribute('href', `//twitter.com/intent/tweet?text=${textDiv.innerHTML}`)
  
}

(function() {
  fetchQuote();
})();

newQuoteBtn.addEventListener('click', () => {
  fetchQuote();
})
