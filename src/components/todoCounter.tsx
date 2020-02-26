import * as React from "react";
import {useEffect, useState} from "react";
import {observers} from "../observer";
import {ITodo} from "../app";

interface ITodosCounterProps {
    todosCounter: number;
}

interface ITodoCounterState {
    total: number;
    completed: number;
    pending: number;
}

type ITodoCounterUseState = [ITodoCounterState, (todosCounterState: ITodoCounterState) => void];

export const TodosCounter = () => {
    console.log("TodosCounter");

    const [todosCounterState, setTodosCounterState]: ITodoCounterUseState = useState<ITodoCounterState>({
        total: 0,
        completed: 0,
        pending: 0
    });

    const refreshCounterCallback = (todos: ITodo[]) => {
        const pending = todos.filter(todo => !todo.completed).length;
        const completed = todos.filter(todo => todo.completed).length;
        const total = todos.length;

        setTodosCounterState({pending, completed, total});
    };

    useEffect(() => {
        observers.on("refreshCounters", refreshCounterCallback);

        return () => {
            observers.remove("refreshCounters", refreshCounterCallback);
        };
    }, [todosCounterState]);

    return (
        <div>
            <div>Pending: {todosCounterState.pending}</div>
            <div>Completed: {todosCounterState.completed}</div>
            <div>total: {todosCounterState.total}</div>
        </div>
    );
};
