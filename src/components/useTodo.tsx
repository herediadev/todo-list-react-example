import {useCallback, useEffect, useState} from "react";
import {ITodo} from "../app";

export type IUseTodos = [ITodo[], (todoTile: string) => void, () => void, () => void];

export const useTodos = (): IUseTodos => {
    console.log("useTodos");

    const [todos, setTodos] = useState<ITodo[]>([]);

    const createNewTodo = (newTodoTitle: string) => {
        return {
            token: btoa(Math.random().toString()),
            userId: 1,
            id: todos.length + 1,
            title: newTodoTitle,
            completed: false
        };
    };

    const addNewTodo = useCallback((todoTitle: string) => {
        setTodos([...todos, createNewTodo(todoTitle)]);
    }, [todos]);

    const clearTodos = useCallback((): void => {
        setTodos([]);
    }, []);

    const loadTodos = useCallback((): void => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then(response => response.json())
            .then((data: ITodo[]) => data.map(todo => Object.assign({}, todo, {token: btoa(Math.random().toString())})))
            .then(data => setTodos([...todos, ...data]));
    }, [todos]);

    useEffect(() => {
        console.log("use effect");
        loadTodos();
    }, []);

    return [todos, addNewTodo, clearTodos, loadTodos];
};
