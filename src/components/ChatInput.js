import React from 'react';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useState } from 'react';

function ChatInput({ onSubmitMessage }) {
  const [message, setMessage] = useState('');

  const handleInputChange = e => {
    setMessage(e.target.value);
  };

  const handleSubmitMessage = e => {
    e.preventDefault();
    if (message.trim() !== '') {
      onSubmitMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmitMessage}>
      <InputGroup shadow="2xl" width="700px">
        <Input
          placeholder="Type a message..."
          bg="white"
          color="gray.600"
          size="md"
          value={message}
          onChange={handleInputChange}
        />
        <InputRightElement>
          <RiSendPlaneFill />
        </InputRightElement>
      </InputGroup>
    </form>
  );
}

export default ChatInput;
