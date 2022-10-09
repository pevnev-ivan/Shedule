import React, {useEffect, useState} from 'react';
import {MonthType} from "../util";
import Task from "./Task";
import styles from './Table.module.css'
import s from '../components/task.module.css'
import {restoreState, saveState} from "../LocalStorage/LocalStorage";

type propsType = {
    currentMonth: MonthType
    theme: boolean
    changeTheme: () => void
}

export type tasksType = {
    name: string
    dayOfWeek: number
    startTime: number
    color: {backgroundColor: string}
}







const Table = (props: propsType) => {

    const taskNames = ['HTML', 'REACT', 'GYM']

    const colorVariantsText = ['MAIN', 'SECONDARY', 'WARNING']
    const timePeriods = ['09:00 - 12:00', '12:00 - 15:00', '15:00 - 18:00', '18:00 - 21:00', '21:00 - 00:00'];
    const timePeriodsClassname = s.timePeriods + ' ' + s.singleTask

    const MAIN ='#92145d'
    const SECONDARY = '#2dc6ff'
    const WARNING = '#fda02e'

    const colorVariants = [MAIN, SECONDARY, WARNING]
    const mainTasksClassName = {backgroundColor: MAIN}

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
    const darkModeClassname = props.theme ? styles.darkMode : ''
    const darkModePeriods = props.theme ? styles.darkModePeriods : ''

    useEffect(() => {
        setTasks(restoreState('TasksArray', tasks))
    }, [])

    useEffect(() => {
      saveState<Array<tasksType>>('TasksArray', tasks)
    }, [tasks])

    const clear = () => {
        localStorage.clear()
        setTasks(restoreState('TasksArray', tasks))
    }

    const addTask = (taskName: string, colorVariant: string, startTime: number, dayOfWeek: number) => {
        let color = {backgroundColor: colorVariant}
        setTasks([...tasks, {name: taskName, dayOfWeek: dayOfWeek, startTime: startTime, color: color}])
    }

    const changeTheme = () => {
        props.changeTheme()
    }



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

    return (
        <div>
            <div className={styles.buttons}>
            <button className={styles.button} onClick={changeTheme}> Change Theme</button>
            <button className={styles.button} onClick={clear}>Clear Cache</button>
            </div>

            <div className={styles.tableContainer + ' ' +  darkModeClassname}>
            <div className={"grid grid-cols-8 grid-rows-6"}>


                {Week.map((row, index) => (
                    <React.Fragment key={index}>
                        {row.map((day, idx) => (
                            (index === 0) ? <div key={idx}> {day.getDate() + ', ' + day.toDateString().slice(0, 3).toUpperCase()}</div> :
                                (idx === 0) ? <div className={timePeriodsClassname + ' ' + darkModePeriods}>{timePeriods[index - 1]}</div> :
                                    <Task
                                        timePeriod={index * 3 + 6}
                                        dayOfWeek={day.getDay() === 0 ? 7 : day.getDay()}
                                        currentHour={new Date().getHours().toString().slice(0, 2)}
                                        tasks={tasks}
                                        addTask={addTask}
                                        taskNames={taskNames}
                                        colorVariants={colorVariants}
                                        colorVariantsText={colorVariantsText}
                                        theme={props.theme}
                                    />

                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div></div>
    )
};

export default Table;