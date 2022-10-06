import React, {MouseEventHandler, useRef} from 'react';

type propsType = {
    taskNames: Array<string>
    colorVariants: Array<string>
    dayOfWeek: number
    startTime: number
    addTaskCallback: (taskName: string, colorVariant: string, startTime: number, dayOfWeek: number) => void
}
const EditableTableItem = (props: propsType) => {

    const taskName = useRef<HTMLSelectElement>(null)
    const colorVariant = useRef<HTMLSelectElement>(null)


    const onClickAddTaskHandler = () => {

        taskName.current && colorVariant.current &&
        props.addTaskCallback(taskName.current.value, colorVariant.current.value, props.startTime, props.dayOfWeek)

    }
    return (
        <>
            <select ref={taskName} name="taskNames" id="taskNames">
                {props.taskNames.map((el, index) => <option  value={el}> {el}</option>)}
            </select>

            <select ref={colorVariant} name="colorVariants" id="colorVariants">
                {props.colorVariants.map((el, index) => <option  value={el}> {el}</option>)}
            </select>
            <button onClick={onClickAddTaskHandler}>Done</button>
            <button>Exit</button>
        </>
    );
};

export default EditableTableItem;