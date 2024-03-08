import { createTheme } from '@mui/material/styles';
import { blue, orange, red, yellow } from '@mui/material/colors';

export  const lightTheme = createTheme({
  palette: {
    primary: {
      main: red[600],
      dark: blue[800],
      contrastText: yellow[600]
      
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
        default: red[300],
        paper: yellow[500]
    }
  },
});

export  const darkTheme = createTheme({
    palette: {
      primary: {
        main: red[600],
        dark: blue[800],
        contrastText: yellow[600]
        
      },
      secondary: {
        main: '#19857b',
      },
      error: {
        main: red.A400,
      },
      background: {
          default: orange[300],
          paper: yellow[500]
      }
    },
  });
  

