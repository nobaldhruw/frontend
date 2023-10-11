const Remarkable = require('remarkable');

function parseMarkdownToObjects(markdownText) {
  const md = new Remarkable({
    html: true, // Enable HTML rendering
  });

  const tokens = md.parse(markdownText, {});

  const resultArray = [];

  for (const token of tokens) {
    if (token.type === 'text') {
      resultArray.push({
        type: 'plain',
        content: token.content,
      });
    } else if (token.type === 'code') {
      const language = token.params || '';
      const content = token.content;
      resultArray.push({
        type: 'code',
        content,
        language,
      });
    }
  }

  return resultArray;
}

// Example usage:
const markdownText = `
# Example Markdown

This is some **bold** text.

\`\`\`javascript
const greeting = 'Hello, world!';
console.log(greeting);
\`\`\`

Here's some more text.
`;

const result = parseMarkdownToObjects(markdownText);
console.log(result);
