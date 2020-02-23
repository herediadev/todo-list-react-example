import * as React from "react";
import {TodoFormComponent} from "./components/todoFormComponent";
import {TodoList} from "./components/todoList";
import {ClearTodoListAction} from "./components/clearTodoListAction";
import {LoadMoreTodos} from "./components/loadMoreTodos";
import {observers} from "./observer";
import {TodosCounter} from "./components/todoCounter";

export interface ITodo {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}


const App = () => {
    console.log("App");

    const clearTodoTrigger = () => observers.trigger("clearTodoList");
    const addNewTodoTrigger = (newTodoTitle: string) => observers.trigger("addNewTodo", newTodoTitle);
    const todosChangeTrigger = (todos: ITodo[]) => observers.trigger("todosChanges", todos);

    const addNewTodoObserver = {
        subscribe: (callback: (newTodoTitle: string) => void): void => observers.on("addNewTodo", callback),
        unsubscribe: (callback: (param?: any) => void): void => observers.remove("addNewTodo", callback)
    };

    const clearTodoListObserver = {
        subscribe: (callback: () => void): void => observers.on("clearTodoList", callback),
        unsubscribe: (callback: (param?: any) => void): void => observers.remove("clearTodoList", callback)
    };

    const todosChangeObserver = {
        subscribe: (callback: (todos: ITodo[]) => void): void => observers.on("todosChanges", callback),
        unsubscribe: (callback: (param?: any) => void): void => observers.remove("todosChanges", callback)
    };

    return (
        <div>
            <h1>Todo List</h1>
            <TodoFormComponent addNewTodo={addNewTodoTrigger}/>
            <ClearTodoListAction clearTodo={clearTodoTrigger}/>
            <LoadMoreTodos loadMoreTodos={todosChangeTrigger}/>
            <TodosCounter todosChangeObserver={todosChangeObserver}/>
            <TodoList addNewTodoObserver={addNewTodoObserver}
                      clearTodoListObserver={clearTodoListObserver}
                      todosChangeObserver={todosChangeObserver}
                      todosChangeTrigger={todosChangeTrigger}/>
        </div>
    );
};

export {
    App
};
