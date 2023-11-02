import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useState } from 'react';
import MyDatePicker from '../ui/MyDatePicker';
import dayjs from 'dayjs';
import MyTimePickerStart from '../ui/MyTimePickerStart';
import MyTimePickerEnd from '../ui/MyTimePickerEnd';
import { v4 as uuidv4 } from 'uuid';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  "@media(max-width: 1600px)": {
    width: 800
  },
  "@media(max-width: 1100px)": {
    width: 500
  },
  "@media(max-width: 600px)": {
    width: "300px"
  }
};



function MyModal({setTasks}) {
  const dispatch = useDispatch()
  const timeStart = useSelector(state => state.time.timeStart)
  const timeEnd = useSelector(state => state.time.timeEnd)
  const openModal = useSelector(state => state.modal.modal)

  const [taskTitle, setTaskTitle] = useState("");
  const [taskComment, setTaskComment] = useState("");
  const [taskDate, setTaskDate] = useState(dayjs())
  const [color, setColor] = useState("#8641E6")

const differenceInMinutes = timeEnd.diff(timeStart, "minute");

const saveTask = () => {

  const taskData = {
    id: uuidv4(),
    time: timeStart.toISOString(),
    title: taskTitle,
    comment: taskComment,
    date: taskDate.toISOString(),
    backgroundColor: color,
    differenceTime: differenceInMinutes,
    };

  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.push(taskData);
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
  setTaskComment("")
  setTaskTitle("")
  dispatch({type: "CLOSE MODAL", payload: false})
  setTasks((prevTasks) => [...prevTasks, taskData])
  dispatch({type: "CHANGE TIME START", payload: dayjs()})
  dispatch({type: "CHANGE TIME END", payload: dayjs().add(1, 'hour')})
};

  const handleClose = () => {
    dispatch({type: "CLOSE MODAL", payload: false})
}

  return (
    <div className='my-modal'>
      <Modal
        open={openModal}
        onClose={handleClose}
      >
        <Box sx={style}>
            <div className="my-modal__body">
                <div className="my-modal__header">
                    <input 
                      className='my-modal__title' 
                      placeholder='Add Title' 
                      type="text" 
                      value={taskTitle}
                      onChange={(e) => setTaskTitle(e.target.value)}
                    />
                    <input className='my-modal__color' value={color} onChange={(e)=>setColor(e.target.value)} type="color" />
                </div>
                <div className="my-modal__date">
                  <CalendarTodayIcon sx=
                  {{
                    fontSize: "34px", 
                    marginRight: "10px",
                    "@media(max-width:600px)": {
                      fontSize: "20px"
                    }
                  }}/>
                  <MyDatePicker taskDate={taskDate} setTaskDate={setTaskDate}/>
                  
                </div>
                <div className="my-modal__time">
                  <AccessTimeIcon sx=
                  {{
                    fontSize: "37px", 
                    marginRight: "9px", 
                    fontWeight: "100",
                    "@media(max-width:600px)":{
                      fontSize: "25px"
                    }
                  }}/>
                  <MyTimePickerStart/>
                  <MyTimePickerEnd/>
                </div>
                <div className="my-modal__comment">
                  <input placeholder='Comment' type="text" value={taskComment} onChange={(e) => setTaskComment(e.target.value)}/>
                </div>
                <div className="my-modal__button">
                  <button style={{backgroundColor: color}} onClick={saveTask}>Add</button>
                </div>
            </div>
        </Box>
      </Modal>
    </div>
  );
}

export default  MyModal