import React from 'react';
import { Flex, Box, Center } from '@chakra-ui/react';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

function MainContent({ messages, onSubmitMessage, onSubmitCodeExecution }) {
  const chatMessages = messages.map(message => (
    <ChatMessage
      content={message.content}
      role={message.role}
      key={message.id}
      onSubmitCodeExecution={onSubmitCodeExecution}
      onSubmitMessage={onSubmitMessage}
    />
  ));

  return (
    <Flex direction="column" height="100vh" width="60%" mx="auto" bg="gray.200">
      {/* Top Box (Expands to occupy available space) */}
      <Box flex="1" px={10} py={2}>
        {chatMessages}
      </Box>

      {/* For some space between the last chatMessage and the chatInput */}
      <Box height="300px" p={50}></Box>

      {/* Bottom Box (Fixed at the bottom) */}
      <Center h="100px" position="fixed" bottom="0" width="60%" px={10}>
        <ChatInput onSubmitMessage={onSubmitMessage} />
      </Center>
    </Flex>
  );
}

export default MainContent;
