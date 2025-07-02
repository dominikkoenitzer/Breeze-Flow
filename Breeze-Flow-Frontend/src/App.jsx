import { Box, Flex, useColorModeValue, IconButton } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';

function App() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarOpen = () => setSidebarOpen(true);
  const handleSidebarClose = () => setSidebarOpen(false);

  return (
    <Flex minH="100vh" bg={bgColor}>
      {/* Sidebar for desktop */}
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
        zIndex={110}
      >
        <Sidebar isMobile={false} />
      </Box>

      {/* Sidebar Drawer for mobile */}
      {sidebarOpen && (
        <Sidebar isMobile={true} onClose={handleSidebarClose} />
      )}

      {/* Main Content */}
      <Box
        as="main"
        flex={1}
        ml={{ base: 0, md: '250px' }}
        pt="60px" // Height of header
        w="100%"
        minH="100vh"
      >
        {/* Mobile menu button */}
        <Box display={{ base: 'block', md: 'none' }} position="fixed" top={2} left={2} zIndex={200}>
          <IconButton
            icon={<FaBars />}
            aria-label="Open menu"
            onClick={handleSidebarOpen}
            size="lg"
            variant="ghost"
          />
        </Box>
        <Header />
        <Box p={{ base: 2, md: 8 }}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
}

export default App;