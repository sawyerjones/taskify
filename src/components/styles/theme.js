import { createTheme } from '@mui/material/styles';
import '@fontsource/kanit/100.css';
import '@fontsource/kanit/200.css';
import '@fontsource/kanit/300.css';
import '@fontsource/kanit/400.css';
import '@fontsource/kanit/500.css';
import '@fontsource/kanit/600.css';
import '@fontsource/kanit/700.css';
import '@fontsource/kanit/800.css';
import '@fontsource/kanit/900.css';


const theme = createTheme({
      typography: {
        fontFamily: [
          'Kanit',
          'Arial',
          'sans-serif'
        ].join(','),
        h1: {
          fontWeight: 600,
          fontSize: '3rem',
          color: '#354042',
        },
        h4: {
          fontWeight: 500,
          fontSize: '1.75rem',
          color: '#354042',
        },
        body1: {
          fontWeight: 400,
        },
        body2: {
          fontWeight: 400,
        },
        button: {
          fontWeight: 500,
        }
    },
    palette: {
      primary: {
        main: '#889063',
      },
      secondary: {
        main: '#354042',
      },
      tertiary: {
        main: '#CFBB99'
      },
      background: {
        default: '#E5D7C4',
      },
      signs: {
        main: "#4C3D19",
        contrastText: '#E5D7C4',
      },
    },
  })

  export default theme;
