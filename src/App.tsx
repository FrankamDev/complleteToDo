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

    setTodos([newTodo, ...todos]);
    setInput("");
    setPriority("Moyenne");
  };

  const filteredTodos =
    filter === "Tous"
      ? todos
      : todos.filter((todo) => todo.priority === filter);

  const urgentCount = todos.filter((t) => t.priority === "Urgente").length;
  const mediumCount = todos.filter((t) => t.priority === "Moyenne").length;
  const lowCount = todos.filter((t) => t.priority === "Basse").length;
  const totalCount = todos.length;

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    const newSelected = new Set(selectedTodos);
    newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
    setSelectedTodos(newSelected);
  };

  const finished = () => {
    setTodos(todos.filter((todo) => !selectedTodos.has(todo.id)));
    setSelectedTodos(new Set());
  };

  return (
    <div className="flex justify-center px-4 sm:px-6 md:px-10">
      <div className="w-full max-w-3xl flex flex-col gap-6 my-10 sm:my-16 bg-base-200 p-5 sm:p-8 rounded-2xl shadow-md">
        
        <div className="flex flex-col sm:flex-row gap-3">
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
            className="select w-full sm:max-w-xs"
          >
            <option value="Urgente">Urgente</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Peu urgente</option>
          </select>
          <button
            onClick={addTodo}
            className="btn btn-primary w-full sm:w-auto"
          >
            Ajouter
          </button>
        </div>

      
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("Tous")}
              className={`btn btn-sm sm:btn-md btn-soft ${
                filter === "Tous" ? "bg-cyan-600 text-white" : ""
              }`}
            >
              Tous ({totalCount})
            </button>
            <button
              onClick={() => setFilter("Urgente")}
              className={`btn btn-sm sm:btn-md btn-soft ${
                filter === "Urgente" ? "bg-red-500 text-white" : ""
              }`}
            >
              Urgente ({urgentCount})
            </button>
            <button
              onClick={() => setFilter("Moyenne")}
              className={`btn btn-sm sm:btn-md btn-soft ${
                filter === "Moyenne" ? "bg-yellow-500 text-white" : ""
              }`}
            >
              Moyenne ({mediumCount})
            </button>
            <button
              onClick={() => setFilter("Basse")}
              className={`btn btn-sm sm:btn-md btn-soft ${
                filter === "Basse" ? "bg-green-500 text-white" : ""
              }`}
            >
              Basse ({lowCount})
            </button>
          </div>

          <button
            disabled={selectedTodos.size === 0}
            onClick={finished}
            className={`btn btn-primary transition-all duration-200 ${
              selectedTodos.size === 0 ? "btn-disabled opacity-50" : ""
            }`}
          >
            Finir ({selectedTodos.size})
          </button>
        </div>

       
        {filteredTodos.length > 0 ? (
          <ul className="space-y-3">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                onEdit={editTodo}
                todo={todo}
                isSelected={selectedTodos.has(todo.id)}
                onDelete={deleteTodo}
                onToggleSelect={toggleTodo}
              />
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center text-center mt-10 text-base-content/70">
            <Construction className="w-16 h-16 text-primary mb-3" />
            <span className="font-semibold">Aucune tâche pour le moment</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
