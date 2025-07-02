import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        borderRadius: 'lg',
        px: 6,
        py: 3,
        fontSize: { base: 'md', md: 'lg' },
        _focus: { boxShadow: 'outline' },
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: 'lg',
          px: 4,
          py: 2,
        },
      },
    },
    Select: {
      baseStyle: {
        field: {
          borderRadius: 'lg',
          px: 4,
          py: 2,
        },
      },
    },
    Card: {
      baseStyle: {
        borderRadius: 'xl',
        boxShadow: 'md',
        p: 4,
      },
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'light' ? 'gray.50' : 'gray.800',
        color: props.colorMode === 'light' ? 'gray.800' : 'gray.100',
        minHeight: '100vh',
      },
      '::-webkit-scrollbar': {
        width: '8px',
        background: 'transparent',
      },
      '::-webkit-scrollbar-thumb': {
        background: props.colorMode === 'light' ? 'gray.300' : 'gray.700',
        borderRadius: '8px',
      },
    }),
  },
});

export default theme;