import React from 'react';
import dayjs from "dayjs";
import {MonthType} from "../util";
import {tasksType} from "./Month";
import styles from './task.module.css'
import {logDOM} from "@testing-library/react";

// type singleDayType = ReturnType<typeof >
type DayType = {
    timePeriod: number
    dayOfWeek: number
    currentHour: string
    tasks: Array<tasksType>
    addTask: (name: string, dayOfWeek: number, startTime: number, color: {backgroundColor: string}) => void
}


const Task = (props: DayType) => {
    const addTaskCallback = (dayOfWeek: number, startTime: number) => {
        let name = 'asd'
        let color = {backgroundColor: 'lightBlue'}
        alert('asd')
        props.addTask(name, dayOfWeek, startTime, color)
        // props.addTask(name: string, dayOfWeek: number, startTime: number, color: {backgroundColor: string})
    }

    const currentTaskClassname = (props.timePeriod <= Number(props.currentHour) && Number(props.currentHour) <  props.timePeriod + 3 && props.dayOfWeek == new Date().getDay())
        ? styles.currentTaskActive + ' ' + styles.currentTableItem : styles.currentTableItem

    let filteredTasks = props.tasks.filter((el) => el.dayOfWeek == props.dayOfWeek && el.startTime == props.timePeriod)


    return (
        <div className="border border-gray-200 flex flex-col">
            <div onClick={() => addTaskCallback(props.dayOfWeek, props.timePeriod)} className={currentTaskClassname}>
                {/*<div>{'Номер дня: ' + props.dayOfWeek}</div>*/}
                {/*<div>{'Текущий час: ' + props.currentHour}</div>*/}
                {/*<div>{'Начало периода: ' + props.timePeriod}</div>*/}
                {/*<div>{'Начало периода таски: ' + props.tasks[0].startTime}</div>*/}

                {filteredTasks.map((el) => <div  className={styles.singleTask} style={el.color}>{el.name.toUpperCase()}</div>)}



            </div>
        </div>
    );
};

export default Task;