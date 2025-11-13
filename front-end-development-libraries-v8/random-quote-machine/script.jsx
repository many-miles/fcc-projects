const { useState, useEffect } = React;

const localQuotes = [
  { content: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { content: "Life is 10% what happens to us and 90% how we react to it.", author: "Charles Swindoll" },
  { content: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
  { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { content: "If opportunity doesn’t knock, build a door.", author: "Milton Berle" }
];

function App() {
  const [quote, setQuote] = useState({ content: "", author: "" });

  const getRandomQuote = () => {
    const random = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    setQuote(random);
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `"${quote.content}" — ${quote.author}`
  )}`;

  return (
    <div id="quote-box">
      <p id="text">{quote.content}</p>
      <p id="author">— {quote.author}</p>
      <div className="buttons">
        <button id="new-quote" onClick={getRandomQuote}>New Quote</button>
        <a
          id="tweet-quote"
          href={tweetURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Tweet
        </a>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
