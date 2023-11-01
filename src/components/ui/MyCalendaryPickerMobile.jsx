import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useDispatch, useSelector } from 'react-redux';

function MyCalendaryPickerMobile({isCalendarOpen}) {
    const dispatch = useDispatch()
    const date = useSelector(state => state.date.date)

    const handleDateChange = (date) => {
        dispatch({type: "CHANGE DATE", payload: date})
      };

    return (
        <div style={{position: "absolute", top: 40, left: -20, zIndex: 4}}>
            {isCalendarOpen && (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar referenceDate={date} onChange={handleDateChange}  sx={{backgroundColor: "white"}}/>
                </LocalizationProvider>
            )}
        </div>
    )
}

export default MyCalendaryPickerMobile
