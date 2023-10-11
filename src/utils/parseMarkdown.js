function parseMarkdown(markdownText) {
  const resultArray = [];
  const lines = markdownText.split('\n');
  let codeBlock = null;
  let plainText = '';

  for (const line of lines) {
    if (line.startsWith('```')) {
      if (codeBlock) {
        // End of code block
        resultArray.push({
          type: 'plain',
          content: plainText,
        });
        plainText = '';
        resultArray.push({
          type: 'code',
          content: codeBlock.content,
          language: codeBlock.language,
        });
        codeBlock = null;
      } else {
        // Start of code block
        const language = line.substring(3).trim();
        codeBlock = {
          language,
          content: '',
        };
      }
    } else if (codeBlock) {
      // Inside code block
      codeBlock.content += line + '\n';
    } else {
      // Plain text
      plainText += line + '\n';
    }
  }

  // If there's an unclosed code block, add it
  if (codeBlock) {
    resultArray.push({
      type: 'plain',
      content: plainText,
    });
    resultArray.push({
      type: 'code',
      content: codeBlock.content,
      language: codeBlock.language,
    });
  } else if (plainText) {
    // If there's plain text after the last code block, add it
    resultArray.push({
      type: 'plain',
      content: plainText,
    });
  }

  return resultArray;
}

export default parseMarkdown;
