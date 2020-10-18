import { createTheme } from '@shopify/restyle';
import { configureFonts } from 'react-native-paper';
import color from 'color';

const palette = {
  black: '#000000',
  white: '#ffffff',
  pinkA400: '#f50057',
};

const theme = createTheme({
  dark: false,
  roundness: 4,
  colors: {
    primary: '#6200ee',
    accent: '#03dac4',
    background: '#f6f6f6',
    surface: palette.white,
    error: '#B00020',
    text: palette.black,
    onBackground: '#000000',
    onSurface: '#000000',
    disabled: color(palette.black).alpha(0.26).rgb().string(),
    placeholder: color(palette.black).alpha(0.54).rgb().string(),
    backdrop: color(palette.black).alpha(0.5).rgb().string(),
    notification: palette.pinkA400,
  },
  fonts: configureFonts(),
  animation: {
    scale: 1.0,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

export type Theme = typeof theme;
export default theme;
