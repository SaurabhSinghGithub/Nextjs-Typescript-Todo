"use client"

import { useState } from "react";
import { useRouter, useParams } from 'next/navigation';
import { useTodosContext } from "@/store/todos";

const EditTodo = () => {
    const router = useRouter();
    const params = useParams();

    const { todos, TodoEdit } = useTodosContext();


    // const todoId = router.query.id as string; // Get the todo ID from the query parameter
    const todoId = params.id as string; // Get the todo ID from the query parameter

    const todo = todos.find(todo => todo.id === todoId);

    const [editedTask, setEditedTask] = useState(todo ? todo.task : "");

    const handleSave = () => {
        if (todo) {
            TodoEdit(todo.id, editedTask);
        }
        router.push("/"); // Navigate back to the homepage
    };

    return (
        <div className="flex gap-2 m-5">
            <input
                type="text"
                value={editedTask}
                onChange={(e) => setEditedTask(e.target.value)}
            />
            <button className='px-3 py-2 rounded-lg bg-green-300 hover:bg-green-500' onClick={handleSave}>Save</button>
        </div>
    );
};

export default EditTodo;




