import * as React from "react";

interface IClearTodoListActionProps {
    clearTodo: () => void
}

export const ClearTodoListAction = (props: IClearTodoListActionProps) => {
    console.log("ClearTodoListAction");
    const clearTodoList = props.clearTodo;

    return <button onClick={clearTodoList}>clear todo list</button>;
};
