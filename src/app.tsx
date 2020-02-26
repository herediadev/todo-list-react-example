import * as React from "react";
import {TodoFormComponent} from "./components/todoFormComponent";
import {TodoList} from "./components/todoList";
import {ClearTodoListAction} from "./components/clearTodoListAction";
import {LoadMoreTodos} from "./components/loadMoreTodos";
import {TodosCounter} from "./components/todoCounter";

export interface ITodo {
    token: string,
    userId: number,
    id: number,
    title: string,
    completed: boolean
}


const App = () => {
    console.log("App");

    return (
        <div>
            <h1>Todo List</h1>
            <TodoFormComponent/>
            <ClearTodoListAction/>
            <LoadMoreTodos/>
            <TodosCounter/>
            <TodoList/>
        </div>
    );
};

export {
    App
};
