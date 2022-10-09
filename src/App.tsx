import React, {useState} from 'react';
import './App.css';
import {getMonth} from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Table from "./components/Table";
import styles from './AppStyles.module.css'

function App() {
    const [currentMonth, setCurrentMonth] = useState(getMonth())
    const [theme, setTheme] = useState<boolean>(true )
    const darkModeClassname = theme ? styles.darkMode : ''

    const changeTheme = () => {
        setTheme(!theme)
    }
    return (
        <div className={darkModeClassname}>
            <div className="h-screen flex flex-col">
                <CalendarHeader/>
                <div className={styles.tableContainer}>
                    <Sidebar/>
                    <Table
                        changeTheme={changeTheme}
                        theme={theme}
                        currentMonth={currentMonth}/>
                </div>
            </div>
        </div>
    );
}

export default App;
