import * as React from "react";
import {useEffect, useState} from "react";
import {ITodo} from "../app";
import {observers} from "../observer";
import {TodoItem} from "./todoItem";

interface ITodoListProps {
    todos: ITodo[]
}

export const TodoList = () => {
    console.log("todo list");

    const [todos, setTodos]: [ITodo[], (todos: ITodo[]) => void] = useState<ITodo[]>([]);

    const loadTodosCallback = (): void => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then(response => response.json())
            .then((data: ITodo[]) => data.map(todo => Object.assign({}, todo, {token: btoa(Math.random().toString())})))
            .then(data => setTodos([...todos, ...data]));
    };

    const newTodoTitleCallback = (newTodoTile: string) => setTodos([...todos, createNewTodo(newTodoTile)]);
    const clearTodosCallback = () => setTodos([]);
    const todoCompletedChangeCallback = (todoChanged: ITodo) => {
        const newTodos = [...todos];
        const index = todos.indexOf(todoChanged);
        newTodos[index].completed = !todoChanged.completed;
        setTodos(newTodos);

        observers.trigger("refreshCounters", todos);
    };

    const todoDeletedCallback = (todo: ITodo) => {
        const index = todos.indexOf(todo);
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    useEffect(() => {
        observers.on("newTodoTitle", newTodoTitleCallback);
        observers.on("loadTodos", loadTodosCallback);
        observers.on("clearTodos", clearTodosCallback);
        observers.on("todoCompletedChange", todoCompletedChangeCallback);
        observers.on("todoDeleted", todoDeletedCallback);

        observers.trigger("refreshCounters", todos);

        return () => {
            observers.remove("newTodoTitle", newTodoTitleCallback);
            observers.remove("loadTodos", loadTodosCallback);
            observers.remove("clearTodos", clearTodosCallback);
            observers.remove("todoCompletedChange", todoCompletedChangeCallback);
            observers.remove("todoDeleted", todoDeletedCallback);
        };
    }, [todos]);

    useEffect(() => {
        loadTodosCallback();
    }, []);

    const createNewTodo = (newTodoTitle: string) => {
        return {
            token: btoa(Math.random().toString()),
            userId: 1,
            id: todos.length + 1,
            title: newTodoTitle,
            completed: false
        };
    };

    return (
        <ul>
            {todos.map(todo => <TodoItem key={todo.token} todo={todo}/>)}
        </ul>
    );
};
