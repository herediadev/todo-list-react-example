import * as React from "react";
import {ChangeEvent, FormEvent} from "react";

interface ITodoFormComponentProps {
    newTodoTitle: string;
    addNewTodo: (todoTitle: string) => void;
    setNewTodoTitle: (newTodoTitle: string) => void
}

export const TodoFormComponent = React.memo((props: ITodoFormComponentProps) => {
    console.log("todo form");

    const handleNewTodoChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("handleNewTodoChange");
        props.setNewTodoTitle(event.target.value);
    };

    const addNewTodo = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.addNewTodo(props.newTodoTitle);
        props.setNewTodoTitle("");
    };

    return (
        <form onSubmit={addNewTodo}>
            <label htmlFor="todoName"/>
            <input type="text" name="todoName" value={props.newTodoTitle} onChange={handleNewTodoChange}
                   autoComplete="off"/>
        </form>
    );
});
