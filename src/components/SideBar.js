import React, { useState } from 'react';
import { Box, Icon, Flex } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

function SideBar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box
      bg="gray.800"
      w={isOpen ? '250px' : '60px'}
      h="100vh"
      p={4}
      color="white"
      overflowX="hidden" // Hide horizontal scrollbar when collapsed
      transition="width 0.2s" // Add smooth width transition
      position="sticky"
      top="0"
      zIndex="sticky"
    >
      <Flex align="center">
        <Icon
          as={isOpen ? ChevronLeftIcon : ChevronRightIcon}
          boxSize={6} // Adjust the size as needed
          cursor="pointer" // Add a cursor pointer to indicate interactivity
          onClick={toggleSidebar}
          mr={2} // Add some margin between the icon and the text
        />
        {isOpen && (
          <>
            {/* Content when sidebar is open */}
            PollyGPT
          </>
        )}
      </Flex>
    </Box>
  );
}

export default SideBar;
