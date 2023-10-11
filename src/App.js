import React, { useState, useEffect, useRef } from 'react';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import Header from './components/Header';
import SideBar from './components/SideBar';
import MainContent from './components/MainContent';

function App() {
  const [chatMessages, setChatMessages] = useState([]);
  const [responseChunks, setResponseChunks] = useState('');
  const currentAiMessageRef = useRef(null);
  const [codeOutput, setCodeOutput] = useState(null);

  useEffect(() => {
    if (responseChunks && currentAiMessageRef.current) {
      // Append the received chunks to the AI message
      currentAiMessageRef.current.content += responseChunks;
      setChatMessages(prevMessages => {
        const updatedMessages = [...prevMessages];
        const index = updatedMessages.findIndex(
          message => message.id === currentAiMessageRef.current.id
        );
        if (index !== -1) {
          updatedMessages[index] = currentAiMessageRef.current;
        }
        return updatedMessages;
      });
    }

    if (codeOutput) {
      // Create a new AI message with the responseData
      const codeOutputMessage = {
        id: Date.now() + 2, // Use a unique ID
        content: codeOutput, // Use responseData here
        role: 'code_agent',
      };
      setChatMessages(prevMessages => [...prevMessages, codeOutputMessage]);
      setCodeOutput(null);
    }
  }, [responseChunks, codeOutput]);

  const requestCodeExecution = async code_string => {
    console.log('Code string: ', code_string);
    try {
      const response = await fetch('http://localhost:5000/api/execute_code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code_string }),
      });
      const responseData = await response.json();
      console.log(responseData);
      setCodeOutput(responseData);
    } catch (error) {
      console.error('Error in code execution:', error);
    }
  };

  const fetchData = async prompt => {
    try {
      const responseStream = await fetch(
        'http://localhost:5000/api/langchain/stream',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt }),
        }
      );

      const reader = responseStream.body.getReader();

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        const textChunk = new TextDecoder().decode(value);
        setResponseChunks(textChunk);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  function onSubmitMessage(text) {
    const userMessage = {
      id: Date.now(),
      content: text,
      role: 'user',
    };

    setChatMessages(prevMessages => [...prevMessages, userMessage]);

    // Create a new AI message with empty content
    const aiMessage = {
      id: Date.now() + 1,
      content: '',
      role: 'ai',
    };

    setChatMessages(prevMessages => [...prevMessages, aiMessage]);
    currentAiMessageRef.current = aiMessage; // Set the current AI message

    fetchData(text);
  }

  return (
    <ChakraProvider>
      <Header />
      <Flex bg="gray.200" overflowY="auto">
        <SideBar />
        <MainContent
          messages={chatMessages}
          onSubmitMessage={onSubmitMessage}
          onSubmitCodeExecution={requestCodeExecution}
        />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
