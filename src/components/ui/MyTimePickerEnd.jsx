import React, { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticTimePicker } from '@mui/x-date-pickers';
import { useDispatch, useSelector } from 'react-redux';
import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock';

function MyTimePickerEnd() {

  const dispatch = useDispatch()
  const timeEnd = useSelector(state => state.time.timeEnd)

  const [showPicker, setShowPicker] = useState(false);
  
  const handleTimeChange = (newTime) => {
    dispatch({type: "CHANGE TIME END", payload: newTime})
  };
  
  const handlePickerClose = () => {
    setShowPicker(false);
  };
  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const formatTime = (time) => {
    return time.format('h:mm A'); 
  };
    

  return (
  <div style={{position: "relative"}}>
    <input
      className='time-input'
      type="text"
      value={formatTime(timeEnd)}
      readOnly 
      onClick={togglePicker}
    />

    {showPicker && (
      <div style={{position: "absolute", zIndex: "3"}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["StaticTimePicker"]}>
            <StaticTimePicker
              value={timeEnd}
              onChange={handleTimeChange}
              onClose={handlePickerClose}
              sx={{
                "@media(max-width:1100px)":{
                  display: "none"
                }
              }}
            />
            <MultiSectionDigitalClock
             value={timeEnd}
             onChange={handleTimeChange}
             onClose={handlePickerClose}
             sx={{
              display: "none",
              "@media(max-width:1100px)": {
                backgroundColor: "white",
                display: "flex"
              }
             }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
    )}
  </div>
  )
}

export default MyTimePickerEnd