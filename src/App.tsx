import React, {useState} from 'react';
import './App.css';
import {getMonth} from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Table from "./components/Table";

function App() {
    const [currentMonth, setCurrentMonth] = useState(getMonth())

    return (
        <>
            <div className="h-screen flex flex-col">
                <CalendarHeader/>
                <div className="flex flex-1">
                    <Sidebar/>
                    <Table currentMonth={currentMonth}/>
                </div>
            </div>
        </>
    );
}

export default App;
