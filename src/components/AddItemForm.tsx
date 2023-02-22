import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


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
            <TextField
                variant={'outlined'}
                size={"small"}
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                label={"Enter title"}
                error={error}
                helperText={error && "Please, enter new title!"}
            />

            <Button
                style={{"marginTop": "5px"}}
                variant={"contained"}
                onClick={addItem}
                size={"small"}
                color={"primary"}
                endIcon={<AddCircleOutlineIcon/>}
            >
                ADD
            </Button>
        </div>
    );
};
