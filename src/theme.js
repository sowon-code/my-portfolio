import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8C3B43',
      light: '#B5555E',
      dark: '#6E2C33',
      contrastText: '#FBF7F4',
    },
    secondary: {
      main: '#F6EDE8',
      contrastText: '#2B2A33',
    },
    background: {
      default: '#F6EDE8',
      paper: '#FBF7F4',
    },
    text: {
      primary: '#2B2A33',
      secondary: '#6E6A6F',
      disabled: '#A8A2A6',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.125rem',
      fontWeight: 700,
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 12,
  },
});

export default theme;
