import React from 'react';
import {
  Box,
  List,
  ListItem,
  Text,
  Image,
  Flex,
  Spacer,
  Button,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

const ErrorBlock = ({ errorData, onDebug }) => {
  //   return <Box color="red.200">{errorData.content.evalue}</Box>;
  return (
    <Box>
      <Flex>
        <Spacer />
        <Button
          size="sm"
          variant="outline"
          color="white"
          onClick={() => onDebug(errorData.content.evalue)}
        >
          Debug
        </Button>
      </Flex>
      <Box bg="gray.800" color="red.200" my={2} p={2}>
        Error: {errorData.content.evalue}
      </Box>
    </Box>
  );
};

const StreamOutputBlock = ({ streamData }) => {
  const textWithLineBreaks = streamData.content.text
    .split('\n')
    .map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index !== streamData.content.text.length - 1 && <br />}
      </React.Fragment>
    ));
  return (
    <Box>
      <Text fontSize="md">{textWithLineBreaks}</Text>
    </Box>
  );
};

const DisplayDataBlock = ({ displayData }) => {
  let content = null;
  if (displayData.content.data['image/png']) {
    content = (
      <Image
        src={`data:image/png;base64,${displayData.content.data['image/png']}`} // Use the appropriate image format and encoding
        alt="API Image"
      />
    );
  }
  return <Box>{content}</Box>;
};

const HTMLOutputBlock = ({ htmlData }) => {
  let htmlString = null;
  if (htmlData.content.data['text/html']) {
    htmlString = htmlData.content.data['text/html'];
  }
  return <Box dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

const CodeOutputRenderer = ({ codeOutput, onDebug }) => {
  const content = codeOutput.map(item => {
    if (item.msg_type === 'error') {
      return <ErrorBlock errorData={item} onDebug={onDebug} />;
    }
    if (item.msg_type === 'stream') {
      return <StreamOutputBlock streamData={item} />;
    }
    if (item.msg_type === 'display_data') {
      return <DisplayDataBlock displayData={item} />;
    }
    if (item.msg_type === 'execute_result') {
      return <HTMLOutputBlock htmlData={item} />;
    }
  });
  return (
    <Box>
      <List>
        {content.map(item => (
          <ListItem key={uuidv4()}>{item}</ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CodeOutputRenderer;
