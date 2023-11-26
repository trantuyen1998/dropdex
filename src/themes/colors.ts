import theme from '@chakra-ui/theme';

export const colors = {
  ...theme.colors,
  primary: '#321C6B',
  secondary: '#1E1644',
  bgPrimary: '#0F0F0F',
  bgSecondary: '#1E2A3B',
  bg3: '#172033',
  bg4: '#5B21B633',
  bg5: '#7C3AED4D',
  bg6: '#5B21B666',
  bg7: '#334155',
  light1: '#F1F5F9',
  light2: '#CBD5E1',
  light3: '#DDD6FE',
  light4: '#C4B5FD',
  light5: '#EDE9FE',
  light6: '#e2e8f0',
  dark1: '#94A3B8',
  dark2: '#293548',
  dark3: '#64748B',
  btnActive1: '#521B6',
};

export type Colors = typeof colors;
export type Color = keyof Colors;
