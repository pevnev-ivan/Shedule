import React from 'react';
import dayjs from "dayjs";
import {MonthType} from "../util";

// type singleDayType = ReturnType<typeof >
type DayType = {
    day: any
}
const Day = (props: DayType) => {
    return (
        <div className="border border-gray-200 flex flex-col">
            <header className="flex flex-col items-center">
                <p className="text-sm mt-1">{props.day.format('ddd').toUpperCase()}</p>
                <p className="text-sm p-1 m-1 text-center"> {props.day.format('DD')}</p>
            </header>

        </div>
    );
};

export default Day;