import React, { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticTimePicker } from '@mui/x-date-pickers';
import { useDispatch, useSelector } from 'react-redux';
import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock';

function MyTimePickerStart() {

  const dispatch = useDispatch()
  const timeStart = useSelector(state => state.time.timeStart)

  const [showPicker, setShowPicker] = useState(false);
  
  const handleTimeChange = (newTime) => {
    dispatch({type: "CHANGE TIME START", payload: newTime})
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
      value={formatTime(timeStart)}
      readOnly 
      onClick={togglePicker}
    />

    {showPicker && (
      <div style={{position: "absolute", zIndex: "3"}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["StaticTimePicker", "MultiSectionDigitalClock"]}>
            <StaticTimePicker
              value={timeStart}
              onChange={handleTimeChange}
              onClose={handlePickerClose}
              sx={{
                "@media(max-width:1100px)":{
                  display: "none"
                }
              }}
            />
            <MultiSectionDigitalClock
             value={timeStart}
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

export default MyTimePickerStart