export const TodoTextField = {
  mb: 2.5,
  '& .MuiOutlinedInput-root': {
    borderRadius: 2.5,
    backgroundColor: '#F8F6F3',
    transition: 'all 0.2s ease-in-out',
    '& fieldset': {
      borderColor: 'transparent',
      borderWidth: 2,
    },
    '&:hover': {
      backgroundColor: '#F5F3F0',
    },
    '&:hover fieldset': {
      borderColor: '#6C9A8B',
    },
    '&.Mui-focused': {
      backgroundColor: '#FFFFFF',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6C9A8B',
      boxShadow: '0px 0px 0px 3px rgba(108, 154, 139, 0.12)',
    },
  },
  '& .MuiInputBase-input': {
    padding: '14px 16px',
    fontSize: '0.95rem',
    color: '#2D3436',
  },
  '& .MuiInputBase-input::placeholder': {
    color: '#B2BEC3',
    opacity: 1,
  },
};
