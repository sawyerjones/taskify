import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: [
          'Poppins',
          'Roboto',
          'Arial',
          'sans-serif'
        ].join(','),
        h1: {
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
          fontSize: '2.5rem',
        },
        h4: {
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 500,
          fontSize: '1.75rem',
        }
    },

    palette: {
      signs: {
        main: "#656565",
        contrastText: '#fff',
      },
    },
  })

  export default theme;