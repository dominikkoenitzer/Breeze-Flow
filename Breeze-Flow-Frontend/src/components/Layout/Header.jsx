import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  useBreakpointValue,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  HStack,
  Container,
  Tooltip,
} from '@chakra-ui/react';
import {
  FaSun,
  FaMoon,
  FaBell,
  FaUser,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
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

            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                size="md"
                px={2}
                py={1}
                _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
              >
                <HStack spacing={2}>
                  <Avatar
                    size="sm"
                    name="User Name"
                    src="https://bit.ly/broken-link"
                  />
                  <Text
                    display={{ base: 'none', md: 'block' }}
                    fontSize="sm"
                    fontWeight="medium"
                  >
                    User Name
                  </Text>
                </HStack>
              </MenuButton>
              <MenuList
                shadow="lg"
                border="1px"
                borderColor={borderColor}
                py={2}
              >
                <MenuItem
                  icon={<Icon as={FaUser} />}
                  onClick={() => navigate('/profile')}
                  _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  icon={<Icon as={FaCog} />}
                  onClick={() => navigate('/settings')}
                  _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                >
                  Settings
                </MenuItem>
                <MenuItem
                  icon={<Icon as={FaQuestionCircle} />}
                  onClick={() => navigate('/help')}
                  _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                >
                  Help Center
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  icon={<Icon as={FaSignOutAlt} />}
                  onClick={() => navigate('/')}
                  _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                >
                  Sign Out
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}

export default Header; 