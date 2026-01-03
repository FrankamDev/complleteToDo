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
  const [isEditing, setIsEditing] = useState(false);

  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);


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

    if (isEditing && editingTodoId !== null) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editingTodoId ? { ...todo, text: input.trim(), priority } : todo
      );
      setTodos(updatedTodos);
      setIsEditing(false);
      setEditingTodoId(null);
    } else {
      const newTodo: Todo = {
        id: Date.now(),
        text: input.trim(),
        priority: priority,
      };

      const newTodos = [newTodo, ...todos];
      setTodos(newTodos);
    }

    setInput("");
    setPriority("Moyenne");
  };

  const handleEdit = (todo: Todo) => {
    setInput(todo.text);
    setPriority(todo.priority);
    setIsEditing(true);
    setEditingTodoId(todo.id);
  };

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const toggleTodo = (id: number) => {
    const newSelected = new Set(selectedTodos);
    newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
    setSelectedTodos(newSelected);
  };

  const finished = () => {
    const newTodos = todos.filter((todo) => !selectedTodos.has(todo.id));
    setTodos(newTodos);
    setSelectedTodos(new Set());
  };

  const urgentCount = todos.filter((t) => t.priority === "Urgente").length;
  const mediumCount = todos.filter((t) => t.priority === "Moyenne").length;
  const lowCount = todos.filter((t) => t.priority === "Basse").length;
  const totalCount = todos.length;

  const filteredTodos =
    filter === "Tous"
      ? todos
      : todos.filter((todo) => todo.priority === filter);

  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-3xl flex flex-col gap-4 my-10 bg-base-300 p-5 rounded-2xl shadow-md">
        <div className="flex flex-col sm:flex-row gap-4">
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
          <button onClick={addTodo} className="btn btn-primary w-full sm:w-auto">
            {isEditing ? "Modifier" : "Ajouter"}
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter("Tous")}
                className={`btn btn-soft ${filter === "Tous" ? "bg-cyan-600 text-gray-900" : ""}`}
              >
                Tous ({totalCount})
              </button>
              <button
                onClick={() => setFilter("Urgente")}
                className={`btn btn-soft ${filter === "Urgente" ? "bg-cyan-600 text-gray-900" : ""}`}
              >
                Urgente ({urgentCount})
              </button>
              <button
                onClick={() => setFilter("Moyenne")}
                className={`btn btn-soft ${filter === "Moyenne" ? "bg-cyan-600 text-gray-900" : ""}`}
              >
                Moyenne ({mediumCount})
              </button>
              <button
                onClick={() => setFilter("Basse")}
                className={`btn btn-soft ${filter === "Basse" ? "bg-cyan-600 text-gray-900" : ""}`}
              >
                Basse ({lowCount})
              </button>
            </div>

            <button
              disabled={selectedTodos.size === 0}
              className="btn btn-primary"
              onClick={finished}
            >
              Finir la section ({selectedTodos.size})
            </button>
          </div>

          {filteredTodos.length > 0 ? (
            <ul className="divide-y divide-primary/20">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  isSelected={selectedTodos.has(todo.id)}
                  onDelete={deleteTodo}
                  onToggleSelect={toggleTodo}
                  onEdit={handleEdit}
                />
              ))}
            </ul>
          ) : (
            <div className="flex flex-col justify-center items-center py-10">
              <Construction className="w-20 h-10 text-primary" />
              <span className="text-sm font-bold">Aucune tâche à faire</span>
            </div>
          )}
        </div>
      <footer className="text-center text-sm text-gray-400 mt-10">
  © {new Date().getFullYear()} frankamdev · 📞  690 46 18 30 
</footer>
      </div>

    </div>
  );
};

export default App;
