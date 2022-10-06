import React, {useState} from 'react';
import {MonthType} from "../util";
import Task from "./Task";

type propsType = {
    currentMonth: MonthType
}

export type tasksType = {
    name: string
    dayOfWeek: number
    startTime: number
    color: { backgroundColor: string }

}

const mainTasksClassName = {backgroundColor: 'lightBlue'}

const Month = (props: propsType) => {
    const [tasks, setTasks] = useState<Array<tasksType>>([
        {
            name: 'Html',
            dayOfWeek: 1,
            startTime: 12,
            color: mainTasksClassName
        },
        {
            name: 'React',
            dayOfWeek: 1,
            startTime: 15,
            color: mainTasksClassName
        },
        {
            name: 'GYM',
            dayOfWeek: 5,
            startTime: 21,
            color: mainTasksClassName
        },
        {
            name: 'GYM',
            dayOfWeek: 4,
            startTime: 21,
            color: mainTasksClassName
        },
    ])

    const addTask = (name: string, dayOfWeek: number, startTime: number, color: {backgroundColor: string}) => {
        setTasks([...tasks, {name: name, dayOfWeek: dayOfWeek, startTime: startTime, color: color}])
    }


    const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thrus', 'Fri', 'Sat'];

    const prevMonday = new Date();
    prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7);


    const year = new Date().getFullYear()
    const month = new Date().getMonth()
    let currentDay = prevMonday.getDate() - 1
    let Week = new Array(7).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentDay++
            return new Date(year, month, currentDay)
        })
    })
    let startHours = 8

    return (
        <div className="flex-1 grid grid-cols-7 grid-rows-8">

            {Week.map((row, index) => (
                <React.Fragment key={index}>
                    {row.map((day, idx) => (
                        index === 0 ? <div key={idx}> {day.getDate() + ', ' + day.toDateString().slice(0, 3).toUpperCase()}</div> :
                            <Task
                                timePeriod={index*3+6}
                                dayOfWeek={day.getDay() === 0 ? 7 : day.getDay()}
                                currentHour={new Date().getHours().toString().slice(0, 2)}
                                tasks={tasks}
                                addTask={addTask}
                            />
                    ))}
                </React.Fragment>
            ))}
        </div>
    )
};

export default Month;