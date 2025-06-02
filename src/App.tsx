import { useEffect, useState } from "react";
import ItemCard from "./components/ItemCard";

function App() {
  let [taskInput, setTaskInput] = useState("");
  let [tasks, setTasks] = useState<
    {
      task: string;
      complete: boolean;
    }[]
  >(loadData());

  useEffect(() => {
    console.log(JSON.stringify(tasks));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function loadData() {
    const jsonTasks = localStorage.getItem("tasks");
    if (jsonTasks) {
      return JSON.parse(jsonTasks);
    }
    return [];
  }

  const handleNewTask = () => {
    if (taskInput !== "") {
      const newTask = { task: taskInput, complete: false };
      setTasks((t) => [...t, newTask]);
    }
    setTaskInput("");
  };

  function handleComplete(index: number) {
    const newTasks = tasks.map((task, i) =>
      i === index ? { task: task.task, complete: true } : task
    );
    setTasks(newTasks);
  }

  function handleDelete(index: number) {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  }

  function handleUndo(index: number) {
    const newTasks = tasks.map((task, i) =>
      i === index ? { task: task.task, complete: false } : task
    );
    setTasks(newTasks);
  }
  function handleText(index: number, text: string) {
    const newTasks = tasks.map((task, i) =>
      i === index ? { task: text, complete: task.complete } : task
    );
    setTasks(newTasks);
  }

  const tasksJSX = tasks.map((task, index) => (
    <ItemCard
      id={index}
      key={index}
      handleComplete={handleComplete}
      handleDelete={handleDelete}
      handleUndo={handleUndo}
      handleText={handleText}
      complete={task.complete}
    >
      {task.task}
    </ItemCard>
  ));
  console.log(tasksJSX);
  return (
    <div className=" min-h-screen items-center flex flex-col justify-center bg-stone-100 selection:bg-pink-400 text-gray-700">
      <div className=" w-[600px] h-[600px] max-w-[95%] py-6 px-4 bg-white rounded-xl flex flex-col space-y-4 shadow-xl">
        <h1 className=" text-4xl font-bold mx-auto mt-4">To Do List 📝</h1>
        <div className="space-x-2 flex flex-row justify-center">
          <input
            type="text"
            placeholder="Enter Task: "
            className="border-2 rounded-md border-gray-400 w-full p-2 focus:outline-pink-500 "
            value={taskInput}
            onChange={(e) => {
              setTaskInput(e.target.value);
            }}
          />
          <button
            className="bg-pink-400 text-white py-1 px-5 rounded-md font-bold hover:bg-pink-500 hover:cursor-pointer active:bg-pink-600 duration-300 ease-in"
            onClick={handleNewTask}
          >
            Add
          </button>
        </div>
        <div className="flex flex-col space-y-4 rounded-xl p-4 h-full overflow-y-auto">
          {tasks.length > 0 ? (
            tasksJSX
          ) : (
            <p className="text-center text-lg">
              No tasks yet. Add one above! ✨
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
