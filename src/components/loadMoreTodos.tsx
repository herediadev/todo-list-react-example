import * as React from "react";

interface ILoadMoreTodosProps {
    loadTodos: () => void
}

export const LoadMoreTodos = React.memo((props: ILoadMoreTodosProps) => {
    console.log("loadMoreTodos");

    return (
        <button onClick={props.loadTodos}>Load more todos</button>
    );
});
