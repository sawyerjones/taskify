export const TodoTextField = {
      '& .MuiOutlinedInput-root': { // default
        '& fieldset': {
          borderColor: '#c3cde4',
          height: '6vh',
          width: '100%',
          marginTop: '0.5vh',
          color: 'white'
        },
        '&:hover fieldset': { // colors on hover
          borderColor: '#8ca2b0',
        },
        '&.Mui-focused fieldset': { // colors on selected
          borderColor: '#8ca2b0',
          backgroundColor: '36454F'
        },
        '& .MuiInputBase-input': { // text
            color: 'white',
        }
      },
};