import { Link as RouterLink, useLocation } from 'react-router-dom'
import { VStack, Link, Icon, Text, HStack } from '@chakra-ui/react'
import { 
  LayoutGrid, 
  CheckSquare, 
  Calendar, 
  Timer, 
  Heart 
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutGrid },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  { name: 'Planner', href: '/planner', icon: Calendar },
  { name: 'Focus', href: '/focus', icon: Timer },
  { name: 'Wellness', href: '/wellness', icon: Heart },
]

export function Navigation() {
  const location = useLocation()

  return (
    <VStack spacing={2} align="stretch">
      {navigation.map((item) => {
        const isActive = location.pathname === item.href
        return (
          <Link
            key={item.name}
            as={RouterLink}
            to={item.href}
            p={2}
            borderRadius="md"
            bg={isActive ? 'blue.500' : 'transparent'}
            color={isActive ? 'white' : 'gray.600'}
            _hover={{
              bg: isActive ? 'blue.600' : 'gray.100',
              color: isActive ? 'white' : 'gray.800',
            }}
            textDecoration="none"
          >
            <HStack spacing={3}>
              <Icon as={item.icon} boxSize={5} />
              <Text fontSize="sm" fontWeight="medium">
                {item.name}
              </Text>
            </HStack>
          </Link>
        )
      })}
    </VStack>
  )
} 