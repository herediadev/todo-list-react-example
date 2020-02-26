import {ITodo} from "../app";
import * as React from "react";
import {ChangeEvent, useState} from "react";
import {observers} from "../observer";

interface ITodoItemProps {
    todo: ITodo
}

export const TodoItem = (props: ITodoItemProps) => {
    const [isCompleted, setIsCompleted]: [boolean, (isCompleted: boolean) => void] = useState<boolean>(props.todo.completed);

    const changeCompleted = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("changeCompleted");
        setIsCompleted(!isCompleted);
        observers.trigger("todoCompletedChange", props.todo);
    };

    const deleteTodo = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        observers.trigger("todoDeleted", props.todo);
    };

    return (
        <li>
            <input type="checkbox" checked={isCompleted} onChange={changeCompleted}/>
            <span>
                {props.todo.title}
            </span>
            <button onClick={deleteTodo} type={"button"}>Delete</button>
        </li>
    );
};
