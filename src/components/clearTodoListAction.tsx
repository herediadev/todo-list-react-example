import * as React from "react";

interface IClearTodoListActionProps {
    clearTodo: () => void
}

export const ClearTodoListAction = React.memo((props: IClearTodoListActionProps) => {
    console.log("ClearTodoListAction");
    return (
        <button onClick={props.clearTodo}>clear todo list</button>
    );
});
