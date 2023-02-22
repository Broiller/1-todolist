import React, {KeyboardEvent, ChangeEvent, useState, ChangeEventHandler, FC} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


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

                    <Checkbox
                        onChange={changeTaskStatus}
                        checked={task.isDone}/>

                    {/*<span>{task.title}</span>*/}
                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>

                    <IconButton
                        onClick={removeTask}
                        size={"small"}
                        color={"primary"}
                    >
                        <HighlightOffIcon/>
                    </IconButton>
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
                <IconButton
                    onClick={removeTodolist}
                    size={"small"}
                    color={"primary"}
                >
                    <HighlightOffIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>

            <ul>
                {taskList}
            </ul>
            <div>
                <ButtonGroup
                    variant="contained"
                    size={"small"}
                    disableElevation
                    fullWidth>

                    <Button sx={{mr: "2px"}}
                            color={props.filter === "all" ? "secondary" : "primary"}
                            onClick={handlerCreator('all')}>All</Button>

                    <Button sx={{mr: "2px"}}
                            color={props.filter === "active" ? "secondary" : "primary"}
                            onClick={handlerCreator('active')}>Active</Button>

                    <Button
                        color={props.filter === "completed" ? "secondary" : "primary"}
                        onClick={handlerCreator('completed')}>Completed</Button>
                </ButtonGroup>
            </div>
        </div>
    );
};