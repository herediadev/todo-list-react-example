import {useEffect, useState} from "react";
import {ITodo} from "../app";

export const useTodos = () => {
    console.log("useTodos");

    const [todos, setTodos] = useState<ITodo[]>([]);

    const createNewTodo = (newTodoTitle: string) => {
        return {
            userId: 1,
            id: todos.length + 1,
            title: newTodoTitle,
            completed: false
        };
    };

    const addNewTodo = (todoTitle: string) => {
        setTodos([...todos, createNewTodo(todoTitle)]);
    };

    useEffect(() => {
        console.log("use effect");
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then(response => response.json())
            .then(data => setTodos([...todos, ...data]))
    }, []);

    return [todos, addNewTodo];
};
