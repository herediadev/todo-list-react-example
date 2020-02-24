import * as React from "react";
import {ITodo} from "../app";

interface ITodoListProps {
    todos: ITodo[]
}

const TodoItem = React.memo((props: { todo: ITodo }) => {
    return <li>{props.todo.title}</li>;
});

export const TodoList = React.memo((props: ITodoListProps) => {
    console.log("todo list");

    return (
        <ul>
            {props.todos.map(todo => <TodoItem key={todo.token} todo={todo}/>)}
        </ul>
    );
});
