import * as React from "react";
import {useEffect} from "react";
import {ITodo} from "../app";

interface ILoadMoreTodosProps {
    loadMoreTodos: (data: ITodo[]) => void
}

export const LoadMoreTodos = (props: ILoadMoreTodosProps) => {
    console.log("loadMoreTodos");

    const loadMoreTodos = () => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then(response => response.json())
            .then(data => props.loadMoreTodos(data));
    };

    useEffect(() => {
        console.log("use effect loadMoreTodos");
        loadMoreTodos();
    }, []);

    return <button onClick={loadMoreTodos}>Load more todos</button>;
};
