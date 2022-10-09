import React, {MouseEventHandler, useRef} from 'react';
import styles from './EditableTableItem.module.css'
import s from './Table.module.css'

type propsType = {
    taskNames: Array<string>
    colorVariants: Array<string>
    dayOfWeek: number
    startTime: number
    colorVariantsText: Array<string>
    addTaskCallback: (taskName: string, colorVariant: string, startTime: number, dayOfWeek: number) => void
}
const EditableTableItem = (props: propsType) => {
    const spanClassName = styles.popup

    const taskName = useRef<HTMLSelectElement>(null)
    const colorVariant = useRef<HTMLSelectElement>(null)


    const onClickAddTaskHandler = () => {

        taskName.current && colorVariant.current &&
        props.addTaskCallback(taskName.current.value, colorVariant.current.value, props.startTime, props.dayOfWeek)

    }
    return (
        <div className={spanClassName}>
            <select ref={taskName} name="taskNames" id="taskNames">
                {props.taskNames.map((el, index) => <option  value={el}> {el}</option>)}
            </select>

            <select ref={colorVariant} name="colorVariants" id="colorVariants">
                {props.colorVariants.map((el, index) => <option  value={el}> {props.colorVariantsText[index]}</option>)}
            </select>
            <div style={{display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center'}}>
            <button className={s.button} onClick={onClickAddTaskHandler}>Done</button>
            <button className={s.button} > Exit</button>
            </div>
        </div>
    );
};

export default EditableTableItem;