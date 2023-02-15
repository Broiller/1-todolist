import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: FC<AddItemFormPropsType> = (props) => {
    let [title, setTitle] = useState<string>("")

    let [error, setError] = useState<boolean>(false)
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        // error && setError(false)
        setTitle(event.currentTarget.value)
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== "") {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => event.key === "Enter" && addItem()
    const errorMessage = error && <p style={{color: "red", fontWeight: 'bold', margin: "0"}}>Title is required</p>
    const inputErrorClass = error ? "input-error" : ""

    return (
        <div className={"addItemForm"}>
            <input
                type="text"
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                className={inputErrorClass}
            />


            <button onClick={addItem}>+</button>
            {errorMessage}
        </div>
    );
};
