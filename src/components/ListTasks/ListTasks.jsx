import { Box, Fab} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MyModal from '../MyModal/MyModal';
import dayjs from "dayjs";
import ClearIcon from '@mui/icons-material/Clear';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MyCalendaryPickerMobile from '../ui/MyCalendaryPickerMobile';

function ListTasks() {
    const dispatch = useDispatch()
    const date = useSelector(state => state.date.date)
    const [tasks, setTasks] = useState([]);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const formattedDate = date.format('D MMMM');

    const times = [
        "9:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
    ]

    useEffect(()=> {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(savedTasks)
    }, [])

    const changeModalState = () => {
        dispatch({type: "OPEN MODAL", payload: true})
    }

    const toggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
    }

    const handleTaskDelete = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks)

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }

    return (
        <div className='list-tasks'>
            <div className="list-tasks__title">
                <span className="list-tasks__date">
                    <CalendarMonthIcon sx={{
                        display: "none",
                        "@media(max-width: 1100px)":{
                            display: "flex",
                            cursor: "pointer",
                        }
                    }}
                    onClick={toggleCalendar}
                    />
                    <MyCalendaryPickerMobile isCalendarOpen={isCalendarOpen}/>
                    {formattedDate}
                </span>
                <Fab 
                onClick={changeModalState} 
                color='primary' 
                aria-label='add'
                sx={{
                    "@media(max-width:600px)":{
                        width: 40,
                        height: 10,
                    }
                }} 
                >
                    <AddIcon/>
                </Fab>
            </div>
            <div className="list-tasks__tasks">
                {times.map((time, index) => (
                    <div className='list-tasks__tasks-time' key={index}>
                        <span>{dayjs(time, "HH:mm").format("HH:mm")}</span>
                        <span className='list-tasks__tasks-border'></span>
                        {tasks
                            .filter(task => dayjs(task.date).format("YYYY-MM-DD") === dayjs(date).format("YYYY-MM-DD"))
                            .filter(task => dayjs(task.time).hour() === dayjs(time, "HH:mm").hour())
                            .map((task, taskIndex) => (
                                <Box sx=
                                    {{
                                        backgroundColor: task.backgroundColor, 
                                        height: task.differenceTime*2, 
                                        borderLeft: `3px solid ${task.backgroundColor}`, 
                                        top: 16 + (dayjs(task.time).minute() * 2),
                                        "@media (max-width: 1600px)":{
                                            height: task.differenceTime*1.9,
                                            top: 12 + (dayjs(task.time).minute() * 2),
                                            left: 90
                                        },
                                        "@media (max-width: 600px)":{
                                            height: task.differenceTime*1.83,
                                            top: 7 + (dayjs(task.time).minute() * 2),
                                            left: 90
                                        },
                                    }} 
                                        className='list-tasks__tasks-comment task'  
                                        key={taskIndex}
                                >
                                    <div className='task__description'>
                                        <h4>{task.title}</h4>
                                        <span>{task.comment}</span>
                                    </div>
                                    <ClearIcon sx=
                                    {{
                                        background: "#000000A8", 
                                        color: "white", 
                                        fontSize: "25px", 
                                        fontWeight: "700", 
                                        cursor: "pointer",
                                        "@media (max-width: 1600px)":{
                                            fontSize: "20px",
                                        }
                                    }} 
                                        onClick={() => handleTaskDelete(task.id)}
                                    />
                                </Box>
                            ))
                        }
                    </div>
                ))}
            </div>
            <MyModal tasks={tasks} setTasks={setTasks}/>
        </div>
    )
}

export default ListTasks