"use client"

import React from 'react'
import Link from 'next/link';
import { useState } from 'react';
import { useTodosContext } from '@/store/todos';
import { useSearchParams } from 'next/navigation';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const Todos = () => {

    // Add state for edited task and todo ID
    const [editedTask, setEditedTask] = useState("");
    const [editingTodoId, setEditingTodoId] = useState("");

    const { todos, toggleTodoCompleted, TodoDelete, TodoEdit } = useTodosContext();

    const searchParams = useSearchParams();
    const todosFilter = searchParams.get("todos");

    let filterTodos = todos;

    if (todosFilter === "active") {

        filterTodos = todos.filter((todo) => {

            return !todo.completed;
        })


    } else if (todosFilter === "completed") {
        filterTodos = todos.filter((todo) => {

            return todo.completed;
        })
    }

    return (
        <ul className='flex flex-col gap-4'>

            {filterTodos.map((todo) => {
                return (

                    // <li className='flex items-center gap-4 text-2xl' key={todo.id}>
                    //     {editingTodoId === todo.id ? (
                    //         <div>
                    //             <input
                    //                 type="text"
                    //                 value={editedTask}
                    //                 onChange={(e) => setEditedTask(e.target.value)}
                    //             />
                    //             <button
                    //                 onClick={() => {
                    //                     TodoEdit(todo.id, editedTask);
                    //                     setEditingTodoId("");
                    //                     setEditedTask("");
                    //                 }}
                    //             >
                    //                 Save
                    //             </button>
                    //         </div>
                    //     ) : (
                    //         <>
                    //             <div onClick={() => {
                    //                 setEditingTodoId(todo.id);
                    //                 setEditedTask(todo.task)
                    //             }} className='cursor-pointer'><AiFillEdit /></div>
                    //             <input
                    //                 className='cursor-pointer'
                    //                 type="checkbox"
                    //                 id={`todo-${todo.id}`}
                    //                 checked={todo.completed}
                    //                 onChange={() => toggleTodoCompleted(todo.id)}
                    //             />
                    //             <label className='cursor-pointer' htmlFor={`todo-${todo.id}`}>{todo.task}</label>
                    //             {todo.completed && <button className='text-red-500' onClick={() => TodoDelete(todo.id)}><AiFillDelete /></button>}
                    //         </>
                    //     )}
                    // </li>




                    <li className='flex items-center gap-4 text-2xl' key={todo.id}>

                        <Link href={`/edit/${todo.id}`}>
                            <AiFillEdit />
                        </Link>
                        <input
                            className='cursor-pointer'
                            type="checkbox"
                            id={`todo-${todo.id}`}
                            checked={todo.completed}
                            onChange={() => toggleTodoCompleted(todo.id)}
                        />
                        <label className='cursor-pointer' htmlFor={`todo-${todo.id}`}>{todo.task}</label>
                        {todo.completed && <button className='text-red-500' onClick={() => TodoDelete(todo.id)}><AiFillDelete /></button>}

                    </li>
                )
            })}

        </ul>
    )
}

export default Todos;