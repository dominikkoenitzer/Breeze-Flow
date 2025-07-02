import {
  Box,
  VStack,
  Icon,
  Text,
  useColorModeValue,
  HStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaTasks,
  FaClock,
  FaCalendarAlt,
  FaChartLine,
  FaCog,
  FaBars,
} from 'react-icons/fa';
import { useRef } from 'react';

const NavItem = ({ icon, children, to, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const activeBg = useColorModeValue('blue.50', 'blue.900');
  const activeColor = useColorModeValue('blue.600', 'blue.200');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Link to={to} onClick={onClick}>
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

function Sidebar({ isMobile, onClose }) {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const navItems = [
    { icon: FaHome, label: 'Dashboard', to: '/' },
    { icon: FaTasks, label: 'Tasks', to: '/tasks' },
    { icon: FaClock, label: 'Focus Timer', to: '/focus-timer' },
    { icon: FaCalendarAlt, label: 'Calendar', to: '/calendar' },
    { icon: FaChartLine, label: 'Analytics', to: '/analytics' },
    { icon: FaCog, label: 'Settings', to: '/settings' },
  ];

  const content = (
    <VStack align="stretch" spacing={1}>
      {navItems.map((item) => (
        <NavItem key={item.label} icon={item.icon} to={item.to} onClick={onClose}>
          {item.label}
        </NavItem>
      ))}
    </VStack>
  );

  if (isMobile) {
    return (
      <Drawer isOpen={true} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={bg}>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>{content}</DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  }

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
      display={{ base: 'none', md: 'block' }}
    >
      {content}
    </Box>
  );
}

export default Sidebar;