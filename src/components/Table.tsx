import React, {useState} from 'react';
import {MonthType} from "../util";
import Task from "./Task";
import styles from './Table.module.css'
import s from '../components/task.module.css'
type propsType = {
    currentMonth: MonthType
}

export type tasksType = {
    name: string
    dayOfWeek: number
    startTime: number
    color: {backgroundColor: string}
}

const MAIN = 'light-blue'
const SECONDARY = 'red'
const WARNING = 'yellow'

const mainTasksClassName = {backgroundColor: 'lightBlue'}
const taskNames = ['HTML', 'REACT', 'GYM']
const colorVariants = [MAIN, 'Secondary', 'Warning']
const Table = (props: propsType) => {
    const [tasks, setTasks] = useState<Array<tasksType>>([
        {
            name: taskNames[0],
            dayOfWeek: 1,
            startTime: 12,
            color: mainTasksClassName
        },
        {
            name: taskNames[1],
            dayOfWeek: 1,
            startTime: 15,
            color: mainTasksClassName
        },
        {
            name: taskNames[2],
            dayOfWeek: 5,
            startTime: 21,
            color: mainTasksClassName
        },
        {
            name: taskNames[1],
            dayOfWeek: 4,
            startTime: 21,
            color: mainTasksClassName
        },
    ])

    const addTask = (taskName: string, colorVariant: string, startTime: number, dayOfWeek: number) => {
        let color = {backgroundColor: colorVariant}
        setTasks([...tasks, {name: taskName, dayOfWeek: dayOfWeek, startTime: startTime, color: color}])
    }


    const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thrus', 'Fri', 'Sat'];
    const timePeriods = ['09:00 - 12:00', '12:00 - 15:00', '15:00 - 18:00', '18:00 - 21:00', '21:00 - 00:00'];

    const timePeriodsClassname = s.timePeriods + ' ' + s.singleTask

    const prevMonday = new Date();
    prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7);


    const year = new Date().getFullYear()
    const month = new Date().getMonth()
    let currentDay = prevMonday.getDate() - 1
    let Week = new Array(6).fill([]).map(() => {
        return new Array(8).fill(null).map((el, index) => {
            if (index === 0) {
                return new Date(year, month, currentDay)
            }
            currentDay++
            return new Date(year, month, currentDay)
        })
    })
    let startHours = 8

    return (<div className={styles.tableContainer}>
            <div className=" grid grid-cols-8 grid-rows-8">


                {Week.map((row, index) => (
                    <React.Fragment key={index}>
                        {row.map((day, idx) => (
                            (index === 0) ? <div key={idx}> {day.getDate() + ', ' + day.toDateString().slice(0, 3).toUpperCase()}</div> :
                                (idx === 0) ? <div className={timePeriodsClassname}>{timePeriods[index - 1]}</div> :
                                    <Task
                                        timePeriod={index * 3 + 6}
                                        dayOfWeek={day.getDay() === 0 ? 7 : day.getDay()}
                                        currentHour={new Date().getHours().toString().slice(0, 2)}
                                        tasks={tasks}
                                        addTask={addTask}
                                        taskNames={taskNames}
                                        colorVariants={colorVariants}
                                    />

                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
};

export default Table;