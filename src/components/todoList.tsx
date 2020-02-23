import * as React from "react";
import {useEffect, useState} from "react";
import {ITodo} from "../app";

interface ITodoListProps {
    addNewTodoObserver: {
        subscribe: (callback: (newTodoTitle: string) => void) => void,
        unsubscribe: (callback: (param?: any) => void) => void;
    },
    clearTodoListObserver: {
        subscribe: (callback: () => void) => void,
        unsubscribe: (callback: (param?: any) => void) => void
    },
    todosChangeObserver: {
        subscribe: (callback: (newTodos: ITodo[]) => void) => void,
        unsubscribe: (callback: (param?: any) => void) => void
    },
    todosChangeTrigger: (todos: ITodo[]) => void
}

const TodoItem = (props: { todo: ITodo }) => {
    return <li key={props.todo.id + Math.random()}>{props.todo.title}</li>;
};

export const TodoList = (props: ITodoListProps) => {
    console.log("todo list");
    const [todos, setTodos] = useState<ITodo[]>([]);

    const callbackTodosChange = (newTodos: ITodo[]) => setTodos([...todos, ...newTodos]);
    const callbackAddNewTodo = (newTodoTitle: string) => setTodos([...todos, createNewTodo(newTodoTitle)]);
    const callbackClearTodos = () => setTodos([]);

    useEffect(() => {
        console.log("subscribe");

        props.todosChangeTrigger(todos);
        props.addNewTodoObserver.subscribe(callbackAddNewTodo);
        props.clearTodoListObserver.subscribe(callbackClearTodos);
        props.todosChangeObserver.subscribe(callbackTodosChange);

        return () => {
            console.log("unsubscribe");
            props.addNewTodoObserver.unsubscribe(callbackAddNewTodo);
            props.clearTodoListObserver.unsubscribe(callbackClearTodos);
            props.todosChangeObserver.unsubscribe(callbackTodosChange);
        };
    }, [todos]);

    const createNewTodo = (newTodoTitle: string) => {
        return {
            userId: 1,
            id: todos.length + 1,
            title: newTodoTitle,
            completed: false
        };
    };

    return (
        <ul>
            {todos.map(todo => <TodoItem key={todo.id + Math.random()} todo={todo}/>)}
        </ul>
    );
};
