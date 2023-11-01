import React, { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers';
import { Box } from '@mui/material';

function MyDatePicker({taskDate ,setTaskDate}) {
    const [showPicker, setShowPicker] = useState(false);

    const handleDateChange = (newDate) => {
        setTaskDate(newDate)
    }

    const togglePicker = () => {
        setShowPicker(!showPicker);
    }

    const formatDate = (time) => {
        return time.format('dddd, D MMMM'); 
    };

    const handlePickerClose = () => {
        setShowPicker(false)
    }

    return (
        <div style={{position: "relative"}}>
            <input
                className='date-input' 
                type="text"
                value={formatDate(taskDate)}
                readOnly
                onClick={togglePicker}
            />

            {showPicker && (
                <Box sx=
                {{
                    position: "absolute", 
                    zIndex: "3",
                    "@media(max-width:600px)":{
                        left: "-90px"
                    }
                }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar
                            sx={{background: "white"}}
                            value={taskDate}
                            onChange={handleDateChange}
                            onClose={handlePickerClose}
                        />
                    </LocalizationProvider>
                </Box>
            )}
        </div>
    )
}

export default MyDatePicker