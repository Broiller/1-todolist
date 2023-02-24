import {FilterValueType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    payload:{
        todolistId: string
    }
}
export type AddTodolistAT = {
    type: "ADD-TODOLIST"
    payload:{
        title: string
    }
}
export type ChangeTodolistTitleAT= {
    type: "CHANGE-TODOLIST-TITLE"
    payload: {
        title: string
        todolistId: string
    }
}
export type ChangeTodolistFilterAT= {
    type: "CHANGE-TODOLIST-FILTER"
    payload: {
        filter: FilterValueType
        todolistId: string
    }
}

export type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

export const todolistReducer = (todolists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter((tl) => tl.id !== action.payload.todolistId)
        case "ADD-TODOLIST":
            const newTodolistId = v1()
            const newTodo: TodolistType = {
                id: newTodolistId,
                title: action.payload.title,
                filter: "all"
            }
            return [...todolists, newTodo]
        case "CHANGE-TODOLIST-FILTER":
           return todolists.map((tl) => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map((tl) => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
        default:
            return todolists
    }
}


export const RemoveTodolistAC = (id: string): RemoveTodolistAT => {
    return {
        type:"REMOVE-TODOLIST",
        payload: {
            todolistId: id
        }
    }
}
export const AddTodolistAC = (title: string): AddTodolistAT => {
    return {
        type:"ADD-TODOLIST",
        payload: {
            title: title   //title
        }
    }
}
export const ChangeTodolistTitleAC = (title: string, id: string): ChangeTodolistTitleAT => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            title: title,
            todolistId: id
        }
    }
}
export const ChangeTodolistFilterAC = (filter: FilterValueType, id: string): ChangeTodolistFilterAT => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {
            filter: filter,
            todolistId: id
        }
    }
}