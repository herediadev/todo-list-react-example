import * as React from "react";
import {observers} from "../observer";

interface ILoadMoreTodosProps {
    loadTodos: () => void
}

export const LoadMoreTodos = () => {
    console.log("loadMoreTodos");

    const loadTodos = () => observers.trigger("loadTodos");

    return (
        <button onClick={loadTodos}>Load more todos</button>
    );
};
