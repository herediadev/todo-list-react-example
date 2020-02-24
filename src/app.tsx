import * as React from "react";
import {useState} from "react";
import {TodoFormComponent} from "./components/todoFormComponent";
import {TodoList} from "./components/todoList";
import {ClearTodoListAction} from "./components/clearTodoListAction";
import {LoadMoreTodos} from "./components/loadMoreTodos";
import {TodosCounter} from "./components/todoCounter";
import {IUseTodos, useTodos} from "./components/useTodo";

export interface ITodo {
    token: string,
    userId: number,
    id: number,
    title: string,
    completed: boolean
}


const App = React.memo(() => {
    console.log("App");

    const [todos, addNewTodo, clearTodo, loadTodo]: IUseTodos = useTodos();
    const [newTodoTitle, setNewTodoTitle] = useState<string>("");

    return (
        <div>
            <h1>Todo List</h1>
            <TodoFormComponent
                addNewTodo={addNewTodo}
                newTodoTitle={newTodoTitle}
                setNewTodoTitle={setNewTodoTitle}/>
            <ClearTodoListAction
                clearTodo={clearTodo}/>
            <LoadMoreTodos
                loadTodos={loadTodo}/>
            <TodosCounter todosCounter={todos.length}/>
            <TodoList todos={todos}/>
        </div>
    );
});

export {
    App
};
