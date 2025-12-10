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
          fontWeight: 700,
          fontSize: '3.5rem',
          color: '#2D3436',
          letterSpacing: '-0.02em',
        },
        h2: {
          fontWeight: 600,
          fontSize: '2.25rem',
          color: '#2D3436',
          letterSpacing: '-0.01em',
        },
        h3: {
          fontWeight: 600,
          fontSize: '1.875rem',
          color: '#2D3436',
        },
        h4: {
          fontWeight: 500,
          fontSize: '1.5rem',
          color: '#2D3436',
        },
        h5: {
          fontWeight: 500,
          fontSize: '1.25rem',
          color: '#2D3436',
        },
        body1: {
          fontWeight: 400,
          fontSize: '1rem',
          color: '#636E72',
        },
        body2: {
          fontWeight: 400,
          fontSize: '0.875rem',
          color: '#636E72',
        },
        button: {
          fontWeight: 600,
          textTransform: 'none',
        },
        subtitle1: {
          fontWeight: 300,
          fontSize: '1.125rem',
          color: '#636E72',
        }
    },
    palette: {
      primary: {
        main: '#6C9A8B',
        light: '#8FB8A8',
        dark: '#4A7A6B',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#2D3436',
        light: '#636E72',
        dark: '#1A1F20',
      },
      tertiary: {
        main: '#E8DDD4'
      },
      background: {
        default: '#F8F6F3',
        paper: '#FFFFFF',
        accent: '#E8DDD4',
      },
      signs: {
        main: "#2D3436",
        contrastText: '#FFFFFF',
      },
      success: {
        main: '#6C9A8B',
        light: '#8FB8A8',
      },
      warning: {
        main: '#D4A574',
      },
      error: {
        main: '#C0392B',
        light: '#E74C3C',
      },
      text: {
        primary: '#2D3436',
        secondary: '#636E72',
        disabled: '#B2BEC3',
      },
      divider: 'rgba(45, 52, 54, 0.08)',
    },
    shape: {
      borderRadius: 12,
    },
    shadows: [
      'none',
      '0px 2px 4px rgba(45, 52, 54, 0.04)',
      '0px 4px 8px rgba(45, 52, 54, 0.06)',
      '0px 8px 16px rgba(45, 52, 54, 0.08)',
      '0px 12px 24px rgba(45, 52, 54, 0.10)',
      '0px 16px 32px rgba(45, 52, 54, 0.12)',
      '0px 20px 40px rgba(45, 52, 54, 0.14)',
      '0px 24px 48px rgba(45, 52, 54, 0.16)',
      '0px 28px 56px rgba(45, 52, 54, 0.18)',
      '0px 32px 64px rgba(45, 52, 54, 0.20)',
      '0px 36px 72px rgba(45, 52, 54, 0.22)',
      '0px 40px 80px rgba(45, 52, 54, 0.24)',
      '0px 44px 88px rgba(45, 52, 54, 0.26)',
      '0px 48px 96px rgba(45, 52, 54, 0.28)',
      '0px 52px 104px rgba(45, 52, 54, 0.30)',
      '0px 56px 112px rgba(45, 52, 54, 0.32)',
      '0px 60px 120px rgba(45, 52, 54, 0.34)',
      '0px 64px 128px rgba(45, 52, 54, 0.36)',
      '0px 68px 136px rgba(45, 52, 54, 0.38)',
      '0px 72px 144px rgba(45, 52, 54, 0.40)',
      '0px 76px 152px rgba(45, 52, 54, 0.42)',
      '0px 80px 160px rgba(45, 52, 54, 0.44)',
      '0px 84px 168px rgba(45, 52, 54, 0.46)',
      '0px 88px 176px rgba(45, 52, 54, 0.48)',
      '0px 92px 184px rgba(45, 52, 54, 0.50)',
    ],
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            padding: '12px 28px',
            fontSize: '1rem',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0px 4px 12px rgba(108, 154, 139, 0.25)',
            },
          },
          contained: {
            '&:hover': {
              transform: 'translateY(-1px)',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 10,
              backgroundColor: '#FFFFFF',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: '#FAFAFA',
              },
              '&.Mui-focused': {
                backgroundColor: '#FFFFFF',
                boxShadow: '0px 0px 0px 3px rgba(108, 154, 139, 0.15)',
              },
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: '0px 4px 20px rgba(45, 52, 54, 0.06)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
    },
  })

  export default theme;
