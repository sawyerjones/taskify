import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function TodoCal({ selectedDate, onDateChange }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
                
                value={selectedDate}
                onChange={onDateChange}
            />
        </LocalizationProvider>
    );
}