import {
  Box,
  Flex,
  Text,
  IconButton,
  useColorModeValue,
  useColorMode,
  HStack,
  Container,
  Tooltip,
} from '@chakra-ui/react';
import {
  FaSun,
  FaMoon,
  FaBell,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Box
      position="fixed"
      top={0}
      right={0}
      left={{ base: 0, md: '250px' }}
      zIndex={100}
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      shadow="sm"
    >
      <Container maxW="full" px={4}>
        <Flex h="60px" alignItems="center" justifyContent="space-between">
          <Text
            fontSize="xl"
            fontWeight="bold"
            color={textColor}
            display={{ base: 'none', md: 'block' }}
          >
            Breeze Flow
          </Text>

          <HStack spacing={3} ml="auto">
            <Tooltip label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}>
              <IconButton
                size="md"
                fontSize="lg"
                variant="ghost"
                color="current"
                onClick={toggleColorMode}
                icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
                aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
                _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
              />
            </Tooltip>

            <Tooltip label="Notifications">
              <IconButton
                size="md"
                fontSize="lg"
                variant="ghost"
                color="current"
                icon={<FaBell />}
                aria-label="Notifications"
                _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
              />
            </Tooltip>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}

export default Header;