import React from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";

function App() {

    const title1 = 'December';
    const title2 = 'January';

    const tasks1: Array<TasksType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJs", isDone: false}
    ]

    const tasks2: Array<TasksType> = [
        {id: 1, title: "Hello World", isDone: true},
        {id: 2, title: "I am Happy", isDone: false},
        {id: 3, title: "Yo", isDone: false},
        {id: 4, title: "Yoa", isDone: false}
    ]

    return (
        <div className="App">
            <Todolist shapka={title1} tasks={tasks1}/>
            <Todolist shapka={title2} tasks={tasks2}/>
        </div>
    );
}

export default App;
