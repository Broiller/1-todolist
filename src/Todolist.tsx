import React from "react";

type TodolistPropsType = {
    shapka: string;
    tasks: Array<TasksType>
}

export type TasksType = {
    id: number,
    title: string,
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <h3>{props.shapka}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((el) => {
                        return (
                            <li><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span></li>
                        )
                    })
                }
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}