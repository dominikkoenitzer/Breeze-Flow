import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

const colors = {
  brand: {
    50: '#E5F0FF',
    100: '#B8D5FF',
    200: '#8ABBFF',
    300: '#5CA0FF',
    400: '#2E86FF',
    500: '#006CFE',
    600: '#0054CB',
    700: '#003D98',
    800: '#002665',
    900: '#000F32',
  },
  darkMode: {
    bg: '#0A1929',
    card: '#132F4C',
    hover: '#173A5E',
    border: '#1E4976',
    text: '#F3F6F9',
    muted: '#A5B4C8',
  },
  lightMode: {
    bg: '#F3F6F9',
    card: '#FFFFFF',
    hover: '#E5EAF2',
    border: '#C7D0DD',
    text: '#0A1929',
    muted: '#3E5060',
  },
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: 'semibold',
      borderRadius: 'lg',
    },
    variants: {
      solid: (props) => ({
        bg: props.colorMode === 'dark' ? 'brand.500' : 'brand.500',
        color: 'white',
        _hover: {
          bg: props.colorMode === 'dark' ? 'brand.400' : 'brand.600',
        },
      }),
      ghost: (props) => ({
        color: props.colorMode === 'dark' ? 'darkMode.text' : 'lightMode.text',
        _hover: {
          bg: props.colorMode === 'dark' ? 'darkMode.hover' : 'lightMode.hover',
        },
      }),
    },
  },
  Card: {
    baseStyle: (props) => ({
      bg: props.colorMode === 'dark' ? 'darkMode.card' : 'lightMode.card',
      borderRadius: 'xl',
      borderWidth: '1px',
      borderColor: props.colorMode === 'dark' ? 'darkMode.border' : 'lightMode.border',
      shadow: 'lg',
      transition: 'all 0.2s',
      _hover: {
        transform: 'translateY(-2px)',
        shadow: 'xl',
      },
    }),
  },
  Input: {
    variants: {
      filled: (props) => ({
        field: {
          bg: props.colorMode === 'dark' ? 'darkMode.card' : 'lightMode.card',
          borderWidth: '1px',
          borderColor: props.colorMode === 'dark' ? 'darkMode.border' : 'lightMode.border',
          _hover: {
            bg: props.colorMode === 'dark' ? 'darkMode.hover' : 'lightMode.hover',
          },
          _focus: {
            borderColor: 'brand.500',
            bg: props.colorMode === 'dark' ? 'darkMode.hover' : 'lightMode.hover',
          },
        },
      }),
    },
    defaultProps: {
      variant: 'filled',
    },
  },
  Modal: {
    baseStyle: (props) => ({
      dialog: {
        bg: props.colorMode === 'dark' ? 'darkMode.card' : 'lightMode.card',
      },
    }),
  },
  Menu: {
    baseStyle: (props) => ({
      list: {
        bg: props.colorMode === 'dark' ? 'darkMode.card' : 'lightMode.card',
        borderColor: props.colorMode === 'dark' ? 'darkMode.border' : 'lightMode.border',
      },
      item: {
        _hover: {
          bg: props.colorMode === 'dark' ? 'darkMode.hover' : 'lightMode.hover',
        },
      },
    }),
  },
};

const styles = {
  global: (props) => ({
    body: {
      bg: props.colorMode === 'dark' ? 'darkMode.bg' : 'lightMode.bg',
      color: props.colorMode === 'dark' ? 'darkMode.text' : 'lightMode.text',
    },
  }),
};

const theme = extendTheme({
  config,
  colors,
  components,
  styles,
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
});

export default theme; 