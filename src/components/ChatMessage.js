import React from 'react';
import { Box, HStack } from '@chakra-ui/react';
import parseMarkdown from '../utils/parseMarkdown';
import CodeRenderer from './CodeRenderer';
import MarkdownRenderer from './MarkdownRenderer';
import CodeOutputRenderer from './CodeOutputRenderer';

function ChatMessage({
  role,
  content,
  onSubmitCodeExecution,
  onSubmitMessage,
}) {
  let parsedMarkdown = null;
  if (role !== 'code_agent') {
    parsedMarkdown = parseMarkdown(content);
  }
  const isUser = role === 'user';

  const messageBoxStyle = {
    bg: isUser ? 'purple.600' : 'gray.600',
    maxWidth: isUser ? '70%' : '90%',
    minWidth: isUser ? '20%' : '50%',
    p: 4,
    color: 'white',
    borderTopLeftRadius: isUser ? '10px' : '0',
    borderTopRightRadius: isUser ? '0' : '10px',
    my: 4,
  };

  function onDebug(error) {
    const prompt = `Getting this error, please fix it.\n Error:\n${error}`;
    onSubmitMessage(prompt);
  }
  let message_content = null;
  if (role !== 'code_agent') {
    message_content = parsedMarkdown.map((item, index) => (
      <Box key={index}>
        {item.type === 'plain' && (
          <MarkdownRenderer markdownText={item.content} />
        )}
        {item.type === 'code' && (
          <CodeRenderer
            language={item.language}
            onSubmitCodeExecution={onSubmitCodeExecution}
          >
            {item.content}
          </CodeRenderer>
        )}
      </Box>
    ));
  } else {
    message_content = (
      <CodeOutputRenderer codeOutput={content} onDebug={onDebug} />
    );
  }
  return (
    <HStack justifyContent={isUser ? 'flex-end' : 'flex-start'}>
      <Box {...messageBoxStyle}>{message_content}</Box>
    </HStack>
  );
}

export default ChatMessage;
