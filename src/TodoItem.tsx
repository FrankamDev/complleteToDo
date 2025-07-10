import { Trash } from "lucide-react";

type Priority = "Urgente" | "Moyenne" | "Basse";

type Todo = {
  id: number;
  text: string;
  priority: Priority;
};

type Props = {
  todo: Todo;
  onDelete: (id: number) => void;
  editText: (id: number, text: string) => void;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
};

const TodoItem = ({ todo, onDelete, isSelected, onToggleSelect }: Props) => {
  return (
    <li className="w-full">
      <div className="p-4 flex flex-col sm:flex-row sm:justify-between gap-4 items-start sm:items-center w-full bg-base-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
        {/* Partie gauche (checkbox + texte + badge) */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-5">
          <input
            type="checkbox"
            checked={isSelected}
            className="checkbox checkbox-primary checkbox-sm"
            onChange={() => onToggleSelect(todo.id)}
          />
          <span className="text-base font-medium text-base-content break-words max-w-[200px] sm:max-w-none">
            {todo.text}
          </span>
          <span
            className={`badge badge-sm px-3 py-1 rounded-full text-white font-semibold ${
              todo.priority === "Urgente"
                ? "bg-red-500"
                : todo.priority === "Moyenne"
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
          >
            {todo.priority}
          </span>
        </div>

        {/* Bouton supprimer aligné à droite */}
        <div className="sm:ml-auto">
          <button
            className="btn btn-sm rounded-full bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-800 transition-all duration-200"
            onClick={() => onDelete(todo.id)}
          >
            <Trash className="w-4 h-4" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
