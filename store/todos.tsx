"use client"

import { createContext, useContext, useState } from "react"

export type Todo = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}

export type TodosContext = {
    todos: Todo[];
    handleAddTodo: (task: string) => void;
    toggleTodoCompleted: (id: string) => void;
    TodoDelete: (id: string) => void;
    TodoEdit: (id: string, newTask: string) => void;
}

const todosContext = createContext<TodosContext | null>(null);

export const TodosProvider = ({ children, }: { children: React.ReactNode }) => {


    const [todos, setTodos] = useState<Todo[]>(() => {
        try {
            const newTodos = localStorage.getItem("todos") || "[]"
            return JSON.parse(newTodos) as Todo[]
        } catch (error) {
            return []
        }
    })

    const handleAddTodo = (task: string) => {

        setTodos((prev) => {
            const newTodos: Todo[] = [
                {
                    id: Math.random().toString(),
                    task,
                    completed: false,
                    createdAt: new Date(),
                },
                ...prev
            ]
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;
        })

    }

    const toggleTodoCompleted = (id: string) => {
        setTodos((prev) => {
            const newTodos = prev.map((task) => {
                if (task.id === id) {
                    return {
                        ...task,
                        completed: !task.completed,
                    }
                }
                return task
            })
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;
        })
    }

    const TodoDelete = (id: string) => {
        setTodos((prev) => {
            const newTodos = prev.filter((task) => {
                return task.id !== id;
            })
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos
        })
    }

    const TodoEdit = (id: string, newTask: string) => {
        setTodos((prev) => {
            const newTodos = prev.map((task) => {
                if (task.id === id) {
                    return {
                        ...task,
                        task: newTask,
                    };
                }
                return task;
            });
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;
        });
    }

    return (
        <todosContext.Provider value={{ todos, handleAddTodo, toggleTodoCompleted, TodoDelete, TodoEdit }}>
            {children}
        </todosContext.Provider>
    )
}

export const useTodosContext = () => {
    const todosContextValue = useContext(todosContext);
    if (!todosContextValue) {
        throw new Error("todosContextValue used outside of Provider")
    }
    return todosContextValue;
}