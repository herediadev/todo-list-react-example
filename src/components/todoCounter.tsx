import * as React from "react";
import {useEffect, useState} from "react";
import {ITodo} from "../app";

interface ITodosCounterProps {
    todosChangeObserver: {
        subscribe: (callback: (todos: ITodo[]) => void) => void,
        unsubscribe: (callback: (param?: any) => void) => void
    },
}

export const TodosCounter = (props: ITodosCounterProps) => {
    const [todosCounter, setTodosCounter] = useState<number>(0);
    const callbackTodosChange = (todos: ITodo[]) => setTodosCounter(todos.length);

    useEffect(() => {
        props.todosChangeObserver.subscribe(callbackTodosChange);

        return () => {
            props.todosChangeObserver.unsubscribe(callbackTodosChange);
        };
    }, [todosCounter]);

    return (
        <div>total: {todosCounter}</div>
    );
};
