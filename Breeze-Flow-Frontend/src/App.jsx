import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';

function App() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Flex minH="100vh" bg={bgColor}>
      {/* Sidebar */}
      <Box
        as="nav"
        w={{ base: 'full', md: '250px' }}
        h="100vh"
        position="fixed"
        top={0}
        left={0}
        bg={useColorModeValue('white', 'gray.800')}
        borderRight="1px"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        display={{ base: 'none', md: 'block' }}
      >
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box
        as="main"
        flex={1}
        ml={{ base: 0, md: '250px' }}
        pt="60px" // Height of header
      >
        <Header />
        <Box p={8}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
}

export default App; 