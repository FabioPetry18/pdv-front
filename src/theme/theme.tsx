import { createTheme } from '@mui/material/styles';
import { blue, orange, pink, purple, red, yellow } from '@mui/material/colors';

export  const lightTheme = createTheme({
  palette: {
    text: {
      primary: purple[500]
    },
    primary: {
      main: purple[600],
      dark: purple[900],
      contrastText: "#fff"
      
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
        default: "#ececec",
        paper: yellow[500]
    }
  },
});

export  const darkTheme = createTheme({
    palette: {
      text: {
       primary: "#fff"
      },
      primary: {
        main: blue[300],
        dark: purple[400],
        contrastText: "#fff"
        
      },
      secondary: {
        main: '#19857b',
      },
      error: {
        main: red.A400,
      },
      background: {
          default: "#2B2B2B",
          paper: pink[500]
      }
    },
  });
  

