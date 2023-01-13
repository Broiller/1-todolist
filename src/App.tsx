import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterButtonNameType = "All" | "Completed" | "Active";

function App() {

    const title1 = 'What to learn';

    let [tasks1, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJs", isDone: false}
    ])
    const removeTask = (taskID: number) => {

        tasks1=tasks1.filter(el => el.id!==taskID)
        setTasks(tasks1)
    }

    return (
        <div className="App">
            <Todolist
                title={title1}
                tasks={tasks1}
                removeTask={removeTask}
            />
        </div>
    );
}

export default App;
