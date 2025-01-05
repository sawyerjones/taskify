import { Button, Box, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';

const theme = createTheme({
  palette: {
    signs: {
      main: "#656565",
      contrastText: '#fff',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <header className="App-header">
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
        }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to *NAME*
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 2, // button spacing
          }}>
          <Button variant='contained' color='signs' size='large'
            sx={{ 
              minWidth: '120px',
              '&:hover': {
                backgroundColor: '#333333'
              }
            }}>
            Sign Up
          </Button>
          <Button variant='contained' color='signs' size='large'
            sx={{ 
              minWidth: '120px',
              '&:hover': {
                backgroundColor: '#333333'
              }
            }}>
            Sign In
          </Button>
          </Box>
        </Box>
       
      </header>
    </div>
    </ThemeProvider>
  );
}

export default App;
