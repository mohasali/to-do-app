import { useEffect, useState } from "react";
import ItemCard from "./components/ItemCard";

function App() {
  let [taskInput, setTaskInput] = useState("");
  let [darkMode, setDarkMode] = useState(loadDarkMode());
  let [tasks, setTasks] = useState<
    {
      task: string;
      complete: boolean;
    }[]
  >(loadTaskData());

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.querySelector("html")?.classList.toggle("dark", darkMode);
    localStorage.setItem("dark", String(darkMode));
  }, [darkMode]);

  function loadTaskData() {
    const jsonTasks = localStorage.getItem("tasks");
    if (jsonTasks) {
      return JSON.parse(jsonTasks);
    }
    return [];
  }

  function loadDarkMode(): boolean {
    const darkTheme = localStorage.getItem("dark");
    if (darkTheme) {
      return darkTheme === "true";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
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
  function handleDarkMode() {
    setDarkMode(!darkMode);
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
  return (
    <div className=" min-h-screen items-center flex flex-col justify-center bg-stone-100 selection:bg-pink-400 text-gray-700 dark:bg-zinc-900 dark:text-white transition-colors duration-500 ease-in-out">
      <div className=" w-[600px] h-[600px] max-w-[95%] py-6 px-4 bg-white rounded-xl flex flex-col space-y-4 shadow-xl dark:bg-zinc-800 dark:shadow-none mt-auto">
        <div className="flex">
          <h1 className=" text-4xl font-bold mx-auto my-4">To Do List 📝</h1>
          <button
            className="p-2 font-semibold focus:outline-none focus:ring-4 focus:ring-pink-400 focus:ring-opacity-50 transition-all duration-300 ease-in-out my-4 text-xl rounded-full cursor-pointer shadow-md hover:shadow-lg active:shadow-sm active:scale-95 bg-zinc-800 hover:bg-zinc-700 text-white dark:bg-gray-200 dark:hover:bg-gray-50 dark:text-zinc-900"
            onClick={handleDarkMode}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
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
            className="bg-pink-400 text-white py-1 px-5 rounded-md font-bold hover:bg-pink-500 hover:cursor-pointer active:bg-pink-600 duration-300 ease-in dark:bg-pink-800 dark:hover:bg-pink-700 dark:active:bg-pink-600"
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
      <footer className="w-full text-center p-4 mt-auto">
        <p className="text-gray-600 dark:text-gray-400">
          Made with{" "}
          <span className="text-pink-500 dark:text-pink-400">
            {darkMode ? "🦉 " : "🌻 "}
          </span>
          by Mohammed Salim!
        </p>
      </footer>
    </div>
  );
}

export default App;
