import * as React from "react";
import {observers} from "../observer";

interface IClearTodoListActionProps {
    clearTodo: () => void
}

export const ClearTodoListAction = () => {
    console.log("ClearTodoListAction");

    const clearTodo = () => observers.trigger("clearTodos");

    return (
        <button onClick={clearTodo}>clear todo list</button>
    );
};
