import React from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  CloseButton,
  useDisclosure,
  Collapse,
  IconButton,
  HStack,
  Text,
  Badge,
} from '@chakra-ui/react';
import { FaWifi, FaWifiSlash, FaDatabase } from 'react-icons/fa';
import { useConnectionState, getConnectionMessage } from '../../utils/connectionStatus';

/**
 * Connection Status Indicator
 * ===========================
 * Shows users the current connection status and whether they're using
 * real data or demo data. Appears as a dismissible alert at the top
 * of the app when there are connection issues.
 */
const ConnectionStatusIndicator = ({ 
  showWhenConnected = false,
  compact = false,
  position = 'top',
}) => {
  const connectionState = useConnectionState();
  const { isOpen, onClose, onToggle } = useDisclosure({ defaultIsOpen: true });
  const message = getConnectionMessage();

  // Don't show anything if connected and showWhenConnected is false
  if (connectionState.isConnected && !connectionState.isUsingMockData && !showWhenConnected) {
    return null;
  }

  // Compact version for header/footer
  if (compact) {
    return (
      <HStack spacing={2} onClick={onToggle} cursor="pointer" title={message.message}>
        <Box color={getStatusColor()}>
          {getStatusIcon()}
        </Box>
        <Text fontSize="sm" color={getStatusColor()}>
          {getCompactText()}
        </Text>
        {connectionState.isUsingMockData && (
          <Badge colorScheme="orange" size="sm">DEMO</Badge>
        )}
      </HStack>
    );
  }

  // Full alert version
  const shouldShow = isOpen && (
    connectionState.isUsingMockData || 
    !connectionState.isConnected || 
    showWhenConnected
  );

  function getStatusColor() {
    if (connectionState.isUsingMockData) return 'orange.500';
    if (!connectionState.isConnected) return 'red.500';
    return 'green.500';
  }

  function getStatusIcon() {
    if (connectionState.isUsingMockData) return <FaDatabase />;
    if (!connectionState.isConnected) return <FaWifiSlash />;
    return <FaWifi />;
  }

  function getCompactText() {
    if (connectionState.isUsingMockData) return 'Demo Mode';
    if (!connectionState.isConnected) return 'Offline';
    return 'Online';
  }

  function getAlertStatus() {
    if (connectionState.isUsingMockData) return 'warning';
    if (!connectionState.isConnected) return 'error';
    return 'success';
  }

  return (
    <Collapse in={shouldShow} animateOpacity>
      <Alert 
        status={getAlertStatus()} 
        variant="solid"
        borderRadius={position === 'top' ? 'none' : 'md'}
        mb={position === 'top' ? 0 : 4}
      >
        <AlertIcon as={getStatusIcon()} />
        <Box flex="1">
          <AlertTitle fontSize="md">
            {message.title}
            {connectionState.isUsingMockData && (
              <Badge ml={2} colorScheme="orange" variant="outline">
                DEMO MODE
              </Badge>
            )}
          </AlertTitle>
          <AlertDescription fontSize="sm">
            {message.message}
            {connectionState.isUsingMockData && (
              <Text mt={1} fontSize="xs" opacity={0.9}>
                Changes will not be saved. Start the backend server to persist data.
              </Text>
            )}
          </AlertDescription>
        </Box>
        <CloseButton
          alignSelf="flex-start"
          position="relative"
          right={-1}
          top={-1}
          onClick={onClose}
        />
      </Alert>
    </Collapse>
  );
};

/**
 * Simple status badge for minimal UI impact
 */
export const ConnectionStatusBadge = () => {
  const connectionState = useConnectionState();
  
  if (connectionState.isConnected && !connectionState.isUsingMockData) {
    return null; // Don't show when everything is working
  }

  return (
    <Badge
      colorScheme={connectionState.isUsingMockData ? 'orange' : 'red'}
      variant="subtle"
      fontSize="xs"
      px={2}
      py={1}
      borderRadius="full"
    >
      {connectionState.isUsingMockData ? 'DEMO' : 'OFFLINE'}
    </Badge>
  );
};

/**
 * Status icon for use in navigation or toolbars
 */
export const ConnectionStatusIcon = ({ size = 'sm', ...props }) => {
  const connectionState = useConnectionState();
  const message = getConnectionMessage();

  const getColor = () => {
    if (connectionState.isUsingMockData) return 'orange.500';
    if (!connectionState.isConnected) return 'red.500';
    return 'green.500';
  };

  const getIcon = () => {
    if (connectionState.isUsingMockData) return FaDatabase;
    if (!connectionState.isConnected) return FaWifiSlash;
    return FaWifi;
  };

  return (
    <IconButton
      icon={React.createElement(getIcon())}
      color={getColor()}
      variant="ghost"
      size={size}
      title={message.message}
      aria-label={`Connection status: ${message.title}`}
      {...props}
    />
  );
};

export default ConnectionStatusIndicator;
