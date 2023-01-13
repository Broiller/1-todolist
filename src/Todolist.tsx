import React, {useState} from "react";
import {FilterButtonNameType} from "./App";


type TodolistPropsType = {
    title: string;
    tasks: Array<TasksType>
    removeTask: (taskID: number) => void
}

export type TasksType = {
    id: number,
    title: string,
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    let [filterButtonName, setFilterButtonName] = useState<FilterButtonNameType>( "All")
    console.log(filterButtonName)
    let durshlag = props.tasks

    if(filterButtonName === "Active") {
        durshlag = props.tasks.filter(el => el.isDone)
    }

    if(filterButtonName === "Completed") {
        durshlag = props.tasks.filter(el => !el.isDone)
    }
    const filteredCurrentTasks = (buttonName: FilterButtonNameType) => {
        setFilterButtonName(buttonName)
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    durshlag.map((el) => {
                        return (
                            <li key={el.id}>
                                <button onClick={() => props.removeTask(el.id)}>X</button>
                                <input type="checkbox" checked={el.isDone}/>
                                <span>{el.title}</span>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={() => filteredCurrentTasks("All")}>All</button>
                <button onClick={() => filteredCurrentTasks("Active")}>Active</button>
                <button onClick={() => filteredCurrentTasks("Completed")}>Completed</button>
            </div>
        </div>
    )
}