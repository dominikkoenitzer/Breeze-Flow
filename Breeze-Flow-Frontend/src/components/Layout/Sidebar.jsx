import {
  Box,
  VStack,
  Icon,
  Text,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaTasks,
  FaClock,
  FaCalendarAlt,
  FaChartLine,
  FaCog,
} from 'react-icons/fa';

const NavItem = ({ icon, children, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const activeBg = useColorModeValue('blue.50', 'blue.900');
  const activeColor = useColorModeValue('blue.600', 'blue.200');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Link to={to}>
      <HStack
        px={4}
        py={3}
        spacing={4}
        rounded="md"
        bg={isActive ? activeBg : 'transparent'}
        color={isActive ? activeColor : undefined}
        _hover={{ bg: !isActive && hoverBg }}
        cursor="pointer"
        transition="all 0.2s"
      >
        <Icon as={icon} fontSize="18" />
        <Text fontWeight="medium">{children}</Text>
      </HStack>
    </Link>
  );
};

function Sidebar() {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      w="240px"
      bg={bg}
      borderRight="1px"
      borderColor={borderColor}
      h="100vh"
      py={8}
      position="sticky"
      top={0}
    >
      <VStack spacing={2} align="stretch">
        <NavItem icon={FaHome} to="/">
          Dashboard
        </NavItem>
        <NavItem icon={FaTasks} to="/tasks">
          Tasks
        </NavItem>
        <NavItem icon={FaClock} to="/focus">
          Focus Timer
        </NavItem>
        <NavItem icon={FaCalendarAlt} to="/calendar">
          Calendar
        </NavItem>
        <NavItem icon={FaChartLine} to="/analytics">
          Analytics
        </NavItem>
        <NavItem icon={FaCog} to="/settings">
          Settings
        </NavItem>
      </VStack>
    </Box>
  );
}

export default Sidebar; 