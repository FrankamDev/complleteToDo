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
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
};

const TodoItem = ({ todo, onDelete, isSelected, onToggleSelect }: Props) => {
  return (
    <li>
      <div className="p-3 flex justify-between items-center">
        <div className="flex gap-2 items-center">
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

        <button
          className="btn btn-sm btn-error btn-soft"
          onClick={() => onDelete(todo.id)}
        >
          <Trash className="w-4 h-4" />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
