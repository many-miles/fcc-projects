const { useState, useEffect } = React;

const defaultMarkdown = `# Markdown Previewer

## Sub-heading (H2)

Here's a link to [FreeCodeCamp](https://www.freecodecamp.org).

Inline code: \`const x = 42\`.

\`\`\`js
// Code block example
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

- List item one
- List item two

> This is a blockquote.

**Bold text** to emphasize things.

![fcc logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;
marked.setOptions({
  gfm: true,
  breaks: true
});

function App() {
  const [text, setText] = useState(defaultMarkdown);
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const getMarkdownText = () => {
    const raw = marked.parse(text);
    return { __html: raw };
  };
  useEffect(() => {
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <div className="container" role="main">
        <section className="panel" aria-labelledby="editorLabel">
          <h2 id="editorLabel">Editor</h2>
          <textarea
            id="editor"
            value={text}
            onChange={handleChange}
            aria-label="Markdown Editor"
          />
        </section>

        <section className="panel" aria-labelledby="previewLabel">
          <h2 id="previewLabel">Preview</h2>
          <div
            id="preview"
            dangerouslySetInnerHTML={getMarkdownText()}
          />
        </section>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
