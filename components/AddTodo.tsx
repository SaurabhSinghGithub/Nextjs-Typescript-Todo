"use client"

import { useState } from "react";
import { useTodosContext } from "@/store/todos";

const AddTodo = () => {

    const [todo, setTodo] = useState("");
    const { handleAddTodo } = useTodosContext();

    const handleSubmit = (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault();
        handleAddTodo(todo);
        setTodo("");
    }

    return (
        <form className='flex gap-1 my-5 w-full' onSubmit={handleSubmit}>

            <input className='border-4 w-[90%]' type="text" placeholder='Write your todo' onChange={(e) => setTodo(e.target.value)} value={todo} required/>

            <button className='px-3 py-2 rounded-lg bg-green-300 hover:bg-green-500' type="submit">ADD</button>

        </form>
    )
}

export default AddTodo;