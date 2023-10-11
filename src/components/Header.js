import React from 'react';
import { Box, Text } from '@chakra-ui/react';

function Header() {
  return (
    <Box
      bg="purple.600"
      w="100%"
      p={4}
      color="white"
      position="sticky"
      top="0"
      zIndex="sticky"
    >
      <Text fontSize="xl">PollyGPT</Text>
    </Box>
  );
}

export default Header;
