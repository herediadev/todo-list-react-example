import * as React from "react";
import {ChangeEvent, FormEvent, useState} from "react";
import {observers} from "../observer";

interface ITodoFormComponentProps {
    newTodoTitle: string;
    addNewTodo: (todoTitle: string) => void;
    setNewTodoTitle: (newTodoTitle: string) => void
}

export const TodoFormComponent = () => {
    console.log("todo form");

    const [newTodoTitle, setNewTodoTitle]: [string, (newTodoTitle: string) => void] = useState<string>("");

    const handleNewTodoChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("handleNewTodoChange");
        setNewTodoTitle(event.target.value);
    };

    const addNewTodo = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        observers.trigger("newTodoTitle", newTodoTitle);
        setNewTodoTitle("");
    };

    return (
        <form onSubmit={addNewTodo}>
            <label htmlFor="todoName"/>
            <input type="text" name="todoName" value={newTodoTitle} onChange={handleNewTodoChange}
                   autoComplete="off"/>
        </form>
    );
};
