import React from 'react';
import {MonthType} from "../util";
import Day from "./Day";

type propsType = {
    currentMonth: MonthType
}

const Month = (props: propsType) => {

    return (
        <div className="flex-1 grid grid-cols-7 grid-rows-5">
            {props.currentMonth.map((row, index) => (
                <React.Fragment key={index}>
                    {row.map((day, idx) => (
                        <Day day={day} key={idx}/>
                    ))}
                </React.Fragment>
            ))}
        </div>
    )
};

export default Month;