import React, { useEffect, useRef, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers';
import { Box } from '@mui/material';

function MyDatePicker({taskDate ,setTaskDate}) {
    const [showPicker, setShowPicker] = useState(false);

    const inputRef =  useRef(null);
    const pickerRef = useRef(null);

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

    const handleClickOutside = (event) => {
        if (showPicker) {
          if (
            inputRef.current &&
            !inputRef.current.contains(event.target) &&
            pickerRef.current &&
            !pickerRef.current.contains(event.target)
          ) {
            setShowPicker(false);
          }
        }
      };
    
      useEffect(()=> {
        document.addEventListener("click", handleClickOutside);
    
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
      }, [showPicker])


    return (
        <div style={{position: "relative"}}>
            <input
                ref={inputRef}
                className='date-input' 
                type="text"
                value={formatDate(taskDate)}
                readOnly
                onClick={togglePicker}
            />

            {showPicker && (
                <Box ref={pickerRef} sx=
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