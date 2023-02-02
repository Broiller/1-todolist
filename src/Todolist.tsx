import React, {KeyboardEvent, ChangeEvent, useState, ChangeEventHandler, FC} from "react";
import {FilterValueType} from "./App";
import {Button} from "./components/Button";


type TodolistPropsType = {
    todolistId: string
    title: string
    filter: FilterValueType
    tasks: Array<TasksType>
    removeTodolist: (todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTodolistFilter: (filter: FilterValueType, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
}

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

export const Todolist: FC<TodolistPropsType> = (props: TodolistPropsType) => {
    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<boolean>(false)


    let tasklist = props.tasks.length
        ? props.tasks.map((task) => {
            const removeTask = () => props.removeTask(task.id, props.todolistId)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todolistId)
            const taskKlasses = ["task"]
            task.isDone && taskKlasses.push('done')

            return (
                <li key={task.id} className={taskKlasses.join(" ")}>
                    <input
                        onChange={changeTaskStatus}
                        type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        : <span>Your tasklist is empty</span>


    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== "") {
            props.addTask(title, props.todolistId)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(event.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => event.key === "Enter" && addTask()
    const removeTodolist = () => props.removeTodolist(props.todolistId)
    const handlerCreator = (filter: FilterValueType): () => void => (): void => props.changeTodolistFilter(filter, props.todolistId)
    const errorMessage = error && <p style={{color: "red", fontWeight: 'bold', margin: "0"}}>Title is required</p>
    const inputErrorClass = error ? "input-error" : ""


    return (
        <div>
            <h3>{props.title}
            <button onClick={removeTodolist}>x</button>
            </h3>
            <div>
                <input
                    type="text"
                    value={title}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    className={inputErrorClass}
                />


                <button onClick={addTask}>+</button>
                {errorMessage}
            </div>
            <ul>
                {tasklist}
            </ul>
            <div>
                <button className={props.filter==='all' ? "btn-active":""}
                onClick={handlerCreator('all')}>All</button>

                <button className={props.filter==='active' ? "btn-active":""}
                onClick={handlerCreator('active')}>Active</button>

                <button className={props.filter==='completed' ? "btn-active":""}
                onClick={handlerCreator('completed')}>Completed</button>
            </div>
        </div>
    );
};