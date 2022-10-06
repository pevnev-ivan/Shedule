import React, {useState} from 'react';
import dayjs from "dayjs";
import {MonthType} from "../util";
import {tasksType} from "./Table";
import styles from './task.module.css'
import {logDOM} from "@testing-library/react";
import EditableTableItem from "./editableTableItem";

// type singleDayType = ReturnType<typeof >
type DayType = {
    timePeriod: number
    dayOfWeek: number
    currentHour: string
    tasks: Array<tasksType>
    addTask: (taskName: string, colorVariant: string, startTime: number, dayOfWeek: number) => void
    taskNames: Array<string>
    colorVariants: Array<string>
    colorVariantsText: Array<string>
}


const Task = (props: DayType) => {
    const [editState, setEditState] = useState<boolean>(false)

    const addTaskCallback = (taskName: string, colorVariant: string, startTime: number, dayOfWeek: number) => {

        console.log('12312')
        props.addTask(taskName, colorVariant, startTime, dayOfWeek)
        setEditState(!editState)
    }

    const currentTaskClassname = (props.timePeriod <= Number(props.currentHour) && Number(props.currentHour) <  props.timePeriod + 3 && props.dayOfWeek == new Date().getDay())
        ? styles.currentTaskActive + ' ' + styles.currentTableItem : styles.currentTableItem

    let filteredTasks = props.tasks.filter((el) => el.dayOfWeek == props.dayOfWeek && el.startTime == props.timePeriod)
    const changeEditStateHandler = () => {
        setEditState(!editState)
    }


    return (
        <div className="border flex flex-col">
            <div onDoubleClick={changeEditStateHandler} className={currentTaskClassname}>
                {/*<div>{'Номер дня: ' + props.dayOfWeek}</div>*/}
                {/*<div>{'Текущий час: ' + props.currentHour}</div>*/}
                {/*<div>{'Начало периода: ' + props.timePeriod}</div>*/}
                {/*<div>{'Начало периода таски: ' + props.tasks[0].startTime}</div>*/}
                {editState && <EditableTableItem taskNames={props.taskNames}
                                                 colorVariants={props.colorVariants}
                                                 addTaskCallback={addTaskCallback} dayOfWeek={props.dayOfWeek}
                                                 startTime={props.timePeriod}
                                                 colorVariantsText={props.colorVariantsText}/>}


                {filteredTasks.map((el) => <div  className={styles.singleTask} style={el.color}>{el.name.toUpperCase()}</div>)}



            </div>
        </div>
    );
};

export default Task;