import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/styles/theme.js';
import SignIn from './pages/SignIn.js';
import Dashboard from './pages/Dashboard.js';
import NotFound from './pages/NotFound.js';
import Account from './pages/Account.js';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;