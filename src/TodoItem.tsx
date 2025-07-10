import { Trash, Pencil } from "lucide-react";

type Priority = "Urgente" | "Moyenne" | "Basse";

type Todo = {
  id: number;
  text: string;
  priority: Priority;
};

type Props = {
  todo: Todo;
  onDelete: (id: number) => void;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
  onEdit: (todo: Todo) => void;
};

const TodoItem = ({ todo, onDelete, isSelected, onToggleSelect, onEdit }: Props) => {
  return (
    <li>
      <div className="p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="flex gap-2 items-center flex-wrap">
          <input
            type="checkbox"
            checked={isSelected}
            className="checkbox checkbox-primary checkbox-sm"
            onChange={() => onToggleSelect(todo.id)}
          />
          <span className="text-md font-bold">{todo.text}</span>
          <span
            className={`badge badge-sm badge-soft ${
              todo.priority === "Urgente"
                ? "badge-error"
                : todo.priority === "Moyenne"
                ? "badge-warning"
                : "badge-success"
            }`}
          >
            {todo.priority}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            className="btn btn-sm btn-warning btn-soft"
            onClick={() => onEdit(todo)}
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            className="btn btn-sm btn-error btn-soft"
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
