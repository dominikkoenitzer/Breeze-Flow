import { Outlet } from "react-router-dom"
import { Box, Flex, Heading } from "@chakra-ui/react"
import { Navigation } from "./navigation"

export function RootLayout() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Flex minH="100vh">
        {/* Sidebar */}
        <Box
          position="fixed"
          insetY={0}
          w="72"
          borderRight="1px"
          borderColor="gray.200"
          bg="white"
        >
          <Flex h="14" alignItems="center" borderBottom="1px" borderColor="gray.200" px={4}>
            <Heading size="md">Breeze Flow</Heading>
          </Flex>
          <Box flex="1" overflowY="auto" py={2}>
            <Navigation />
          </Box>
        </Box>
        
        {/* Main content */}
        <Box pl="72" w="full">
          <Box as="main" flex="1">
            <Outlet />
          </Box>
        </Box>
      </Flex>
    </Box>
  )
} 