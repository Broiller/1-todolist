import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterButtonNameType = "All" | "Completed" | "Active";

function App() {

    const title1 = 'What to learn';

    let [tasks1, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJs", isDone: false},
        {id: v1(), title: "Rest IP", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ])


    const addTask = (title: string) => {

        const newTask = {id: v1(), title: title, isDone: false}


        setTasks([newTask, ...tasks1])

    }
    const removeTask = (taskID: string) => {

        tasks1 = tasks1.filter(el => el.id !== taskID)
        setTasks(tasks1)
    }

    return (
        <div className="App">
            <Todolist
                title={title1}
                tasks={tasks1}
                removeTask={removeTask}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
