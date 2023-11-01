import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

function MyCalendar() {
    const dispatch = useDispatch()
    const date = useSelector(state => state.date.date)

    const handleDateChange = (date) => {
        dispatch({type: "CHANGE DATE", payload: date})
      };

    return (
        <div className='calendar-block'>
            <div className="calendar-block__wrapper">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateCalendar']}>
                        <DateCalendar
                            sx=
                            {{
                                color: "white", 
                                background: "rgba(42, 46, 65, 0.58)", 
                                backdropFilter: "blur(5px)",
                            }}
                            referenceDate={date}
                            views={['year', 'month', 'day']}
                            onChange={handleDateChange}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </div>
        </div>
    )
}


export default MyCalendar