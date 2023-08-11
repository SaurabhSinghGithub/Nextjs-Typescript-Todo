import AddTodo from "@/components/AddTodo"
import Todos from "@/components/Todos"
import Navbar from "@/components/Navbar"

export default function Home() {

  return (
    <main className="p-5 max-w-[1300px] mx-auto flex flex-col justify-center items-center">

      <h1 className="mb-4 text-3xl">TODO APP</h1>
      <Navbar />
      <AddTodo />
      <Todos />

    </main>
  )
}
