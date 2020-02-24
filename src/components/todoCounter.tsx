import * as React from "react";

interface ITodosCounterProps {
    todosCounter: number;
}

export const TodosCounter = React.memo((props: ITodosCounterProps) => {
    console.log("TodosCounter");
    return (
        <div>total: {props.todosCounter}</div>
    );
});
