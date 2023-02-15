import React, {KeyboardEvent, ChangeEvent, useState, ChangeEventHandler, FC} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";


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
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

export const Todolist: FC<TodolistPropsType> = (props: TodolistPropsType) => {

    let taskList = props.tasks.length
        ? props.tasks.map((task) => {
            const taskClasses = ["task"]
            task.isDone && taskClasses.push('done')

            const removeTask = () => props.removeTask(task.id, props.todolistId)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todolistId)
            const changeTaskTitle = (title: string) => props.changeTaskTitle(task.id, title, props.todolistId)

            return (
                <li key={task.id} className={taskClasses.join(" ")}>
                    <input
                        onChange={changeTaskStatus}
                        type="checkbox" checked={task.isDone}/>
                    {/*<span>{task.title}</span>*/}
                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        : <span>Your taskList is empty</span>


    const addTask = (title: string) => {
        props.addTask(title, props.todolistId)
    }

    const removeTodolist = () => props.removeTodolist(props.todolistId)
    const handlerCreator = (filter: FilterValueType): () => void => (): void => props.changeTodolistFilter(filter, props.todolistId)
    const changeTodoListTitle = (title: string) => props.changeTodolistTitle(title, props.todolistId)

    return (
        <div>
            <h3><EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>

            <ul>
                {taskList}
            </ul>
            <div>
                <button className={props.filter === 'all' ? "btn-active" : ""}
                        onClick={handlerCreator('all')}>All
                </button>

                <button className={props.filter === 'active' ? "btn-active" : ""}
                        onClick={handlerCreator('active')}>Active
                </button>

                <button className={props.filter === 'completed' ? "btn-active" : ""}
                        onClick={handlerCreator('completed')}>Completed
                </button>
            </div>
        </div>
    );
};