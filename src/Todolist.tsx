import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {FilterButtonNameType} from "./App";
import {Button} from "./components/Button";


type TodolistPropsType = {
    title: string;
    tasks: Array<TasksType>
    removeTask: (taskID: string) => void
    addTask: (title: string) => void
}

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    let [filterButtonName, setFilterButtonName] = useState<FilterButtonNameType>("All")

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addTaskHandler()
        }
    }
    const removeTaskHandler = (tID: string) => {
        props.removeTask(tID)
    }
    const tsarHandler = (nameButton: FilterButtonNameType) => {
        filteredCurrentTasks(nameButton)
    }


    let durshlag = props.tasks

    if (filterButtonName === "Active") {
        durshlag = props.tasks.filter(el => el.isDone)
    }

    if (filterButtonName === "Completed") {
        durshlag = props.tasks.filter(el => !el.isDone)
    }
    const filteredCurrentTasks = (buttonName: FilterButtonNameType) => {
        setFilterButtonName(buttonName)
    }

    let [title, setTitle] = useState("")


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
                <Button name={"+"} callBack={addTaskHandler}/>
            </div>
            <ul>
                {
                    durshlag.map((el) => {
                        return (
                            <li key={el.id}>
                                <Button name={"X"} callBack={() => removeTaskHandler(el.id)}/>
                                <input type="checkbox" checked={el.isDone}/>
                                <span>{el.title}</span>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <Button name={"all"} callBack={() => tsarHandler("All")}/>
                <Button name={"active"} callBack={() => tsarHandler("Active")}/>
                <Button name={"completed"} callBack={() => tsarHandler("Completed")}/>
            </div>
        </div>
    )
}