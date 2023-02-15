import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";

export type FilterValueType = "all" | "completed" | "active";

type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

type TaskStateType = {
    [todolistID: string]: Array<TasksType>
}

function App() {

    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID_1, title: 'What to lean', filter: "all"},
        {id: todolistID_2, title: 'What to buy', filter: "all"},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJs", isDone: false},
        ],
        [todolistID_2]: [
            {id: v1(), title: "WHISKEY", isDone: true},
            {id: v1(), title: "COLA", isDone: true},
            {id: v1(), title: "ACE", isDone: false},
        ]
    })

    const changeTodolistFilter = (filter: FilterValueType, todolistId: string) => {
        const updateTodolists = todolists.map((tl) => tl.id === todolistId ? {...tl, filter: filter} : tl)
        setTodolists(updateTodolists)
    }
    const changeTodolistTitle = (title: string, todolistId: string) => {
        const updateTodolists = todolists.map((tl) => tl.id === todolistId ? {...tl, title: title} : tl)
        setTodolists(updateTodolists)
    }
    const removeTodolist = (todolistId: string) => {
        const updateTodolists = todolists.filter((tl) => tl.id !== todolistId)
        setTodolists(updateTodolists)
    }
    const addTodolist = (title: string) => {
        const newTodolistId = v1()
        const newTodo: TodolistType = {
            id: newTodolistId,
            title: title,
            filter: "all"
        }
        setTodolists([...todolists, newTodo])
        setTasks({...tasks, [newTodolistId]: []})
    }

    const removeTask = (taskId: string, todolistId: string) => {
        const updateRemoveTask = tasks[todolistId].filter(task => task.id !== taskId)
        setTasks({...tasks, [todolistId]: updateRemoveTask})
    }
    const addTask = (title: string, todolistId: string) => {

        const newTask: TasksType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const updateTask = [...tasks[todolistId], newTask]
        setTasks({...tasks, [todolistId]: updateTask})
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        const updateTaskStatus = tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        setTasks({...tasks, [todolistId]: updateTaskStatus})
    }

    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        const updateTaskStatus = tasks[todolistId].map(t => t.id === taskId ? {...t, title: title} : t)
        setTasks({...tasks, [todolistId]: updateTaskStatus})
    }
    const getFilteredTasksForRender =
        (tasks: Array<TasksType>, filter: FilterValueType): Array<TasksType> => {
            switch (filter) {
                case "active":
                    return tasks.filter(task => task.isDone === false)
                case "completed":
                    return tasks.filter(task => task.isDone === true)
                default:
                    return tasks
            }
        }


    const todolistComponents = todolists.length
    ? todolists.map((tl) => {

        const  filteredTasksForRender = getFilteredTasksForRender(tasks[tl.id], tl.filter)
        return (
            <Todolist
                key={tl.id}
                todolistId={tl.id}
                title={tl.title}
                tasks={filteredTasksForRender}
                removeTask={removeTask}
                changeTodolistFilter={changeTodolistFilter}
                filter={tl.filter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeTodolist={removeTodolist}
                changeTaskTitle={changeTaskTitle}
                changeTodolistTitle={changeTodolistTitle}
            />
        )
    })
        : <span>Create your first todolist!</span>
    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolistComponents}
        </div>
    );
}

export default App;
