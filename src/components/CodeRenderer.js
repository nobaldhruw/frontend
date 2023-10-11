import React from 'react';
import { Box, Flex, Spacer, Button } from '@chakra-ui/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeRenderer = ({ language, children, onSubmitCodeExecution }) => {
  return (
    <Box>
      {/* <ButtonGroup variant="outline" spacing="3">
        <Button size="sm">Run</Button>
        <Button size="sm">Copy</Button>
      </ButtonGroup> */}
      <Flex>
        <Spacer />
        <Button
          size="sm"
          variant="outline"
          color="white"
          onClick={() => onSubmitCodeExecution(children)}
        >
          Run
        </Button>
      </Flex>
      <SyntaxHighlighter language={language} style={atomDark}>
        {children}
      </SyntaxHighlighter>
    </Box>
  );
};

export default CodeRenderer;
