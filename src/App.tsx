import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { Construction } from "lucide-react";

type Priority = "Urgente" | "Moyenne" | "Basse";

type Todo = {
  id: number;
  text: string;
  priority: Priority;
};

const App = () => {
  const [input, setInput] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("Moyenne");
  const savedTodos = localStorage.getItem("todos");
  const initialTodos = savedTodos ? JSON.parse(savedTodos) : [];

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [filter, setFilter] = useState<Priority | "Tous">("Tous");
  const [selectedTodos, setSelectedTodos] = useState<Set<number>>(new Set());

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() === "") {
      return alert("Saisis une tâche bro!!");
    }

    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      priority: priority,
    };

    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
    setInput("");
    setPriority("Moyenne");
    console.log(newTodos);
  };

  let filteredTodos: Todo[] = [];
  if (filter === "Tous") {
    filteredTodos = todos;
  } else {
    filteredTodos = todos.filter((todo) => todo.priority === filter);
  }

  const urgentCount = todos.filter((t) => t.priority === "Urgente").length;
  const mediumCount = todos.filter((t) => t.priority === "Moyenne").length;
  const lowCount = todos.filter((t) => t.priority === "Basse").length;
  const totalCount = todos.length;

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

const toggleTodo = (id: number) => {
  const newSelected = new Set(selectedTodos);
  if (newSelected.has(id)) {
    newSelected.delete(id);
  } else {
    newSelected.add(id);
  }
  setSelectedTodos(newSelected);
};

  const finished = () => {
    const newTodos = todos.filter((todo) => !selectedTodos.has(todo.id));
    setTodos(newTodos);
    setSelectedTodos(new Set());
  };
  return (
    <div className="flex justify-center">
      <div className="w-2/3 flex flex-col gap-4 my-16 bg-base-300 p-5 rounded-2xl">
        <div className="flex gap-4">
          <input
            type="text"
            className="input w-full"
            placeholder="Ajouter une tâche"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="select w-full"
          >
            <option value="Urgente">Urgente</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Peu urgente</option>
          </select>
          <button onClick={addTodo} className="btn btn-primary">
            Ajouter
          </button>
        </div>

        <div className="space-y-2 flex-1 h-fit">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setFilter("Tous")}
              className={`btn btn-soft ${
                filter === "Tous" ? "bg-cyan-600 text-gray-900" : ""
              }`}
            >
              Tous ({totalCount})
            </button>

            <button
              onClick={() => setFilter("Urgente")}
              className={`btn btn-soft ${
                filter === "Urgente" ? "bg-cyan-600 text-gray-900" : ""
              }`}
            >
              Urgente ({urgentCount})
            </button>

            <button
              onClick={() => setFilter("Moyenne")}
              className={`btn btn-soft ${
                filter === "Moyenne" ? "bg-cyan-600 text-gray-900" : ""
              }`}
            >
              Moyenne ({mediumCount})
            </button>

            <button
              onClick={() => setFilter("Basse")}
              className={`btn btn-soft ${
                filter === "Basse" ? "bg-cyan-600 text-gray-900" : ""
              }`}
            >
              Basse ({lowCount})
            </button>
          </div>
            <button disabled={selectedTodos.size === 0}
              className="btn btn-primary"
              onClick={finished}
            >Finir la section ({selectedTodos.size})</button>
          </div>

          {filteredTodos.length > 0 ? (
            <div>
              <ul className="divide-y divide-primary/20">
                {filteredTodos.map((todo) => (
                  <li key={todo.id} className="flex gap-4">
                    <TodoItem
                      isSelected={selectedTodos.has(todo.id)}
                      todo={todo}
                      onDelete={deleteTodo}
                      onToggleSelect={toggleTodo}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <Construction className="w-40 h-10 text-primary" />
              <span className="text-sm font-bold">Aucune tâche à faire</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
