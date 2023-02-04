import { extendTheme } from '@chakra-ui/react';
import Button from './components/Button';

const theme = extendTheme({
  colors: {
    // 'daabo-primary': '#6b4eff',
    'daabo-primary': {
      50: '#FFFFFF',
      100: '#F3F1FF',
      200: '#D1C8FF',
      300: '#AFA0FF',
      400: '#8D77FF',
      500: '#6B4EFF',
      600: '#3C16FF',
      700: '#2400DD',
      800: '#1B00A5',
      900: '#12006D',
    },
    'daabo-text-black': '#343434',
    'daabo-black': '#060809',
    'daabo-turquoise': '#72b8f9',
    'daabo-peach': '#fab8c3',
    'daabo-white': '#f3f3f3',
    'daabo-grey': '#808080',
    'daabo-light-grey': '#e5e5e5',
    'daabo-white-alt': '#fcfcfc',
  },
  textStyles: {
    heading: {
      fontSize: '1.875rem',
      fontWeight: 700,
    },
  },
  fonts: {
    heading: 'Poppins, Arial, Helvetica, "Liberation Sans", sans-serif',
    body: 'Poppins, Arial, Helvetica, "Liberation Sans", sans-serif',
  },
  global: {
    body: {
      color: 'daabo-text-black',
    },
    h1: {
      fontWeight: 'bold',
      fontSize: '3xl',
    },
    '.full-bleed': {
      width: '100vw',
      pos: 'relative',
      left: '50%',
      right: '50%',
      ml: '-50vw',
      mr: '-50vw',
    },
  },
  components: {
    Button,
  },
});

export default theme;
