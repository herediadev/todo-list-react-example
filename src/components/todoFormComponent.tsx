import * as React from "react";
import {ChangeEvent, FormEvent, useState} from "react";

interface ITodoFormComponentProps {
    addNewTodo: (newTodoTitle: string) => void
}

export const TodoFormComponent = (props: ITodoFormComponentProps) => {
    console.log("todo form");

    const [newTodoTitle, setNewTodoTitle] = useState<string>("");

    const handleNewTodoChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("handleNewTodoChange");
        setNewTodoTitle(event.target.value);
    };

    const addNewTodo = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.addNewTodo(newTodoTitle);
        setNewTodoTitle("");
    };

    return (
        <form action="#" onSubmit={addNewTodo}>
            <label htmlFor="todoName"/>
            <input type="text" name="todoName" value={newTodoTitle} onChange={handleNewTodoChange}
                   autoComplete="off"/>
        </form>
    );
};
