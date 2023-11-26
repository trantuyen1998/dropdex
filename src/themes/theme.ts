import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import { colors } from './colors';
import { Container } from './components/Container';
import { styles } from './global';

const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1440px',
  '3xl': '1500px',
});

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  cssVarPrefix: 'crypto',
};

const theme = extendTheme({
  config,
  styles,
  colors,
  breakpoints,
  fonts: {
    body: 'Inter, Work Sans, sans-serif',
    heading: 'Inter, Work Sans, sans-serif',
  },
  components: {
    Container,
  },
});

export default theme;
