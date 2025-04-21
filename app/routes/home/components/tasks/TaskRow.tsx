import {
  ListBulletIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useTasks, useDeleteTask, useUpdateTask } from "~/api/task.query";
import type { Task } from "~/api/task.types";
import { useState } from "react";
import type { Option, TaskForm } from "../modal/EditTaskModal";
import EditTaskModal from "../modal/EditTaskModal";

function getStatusClasses(status: string) {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default function TaskRow() {
  const { data, isLoading } = useTasks();
  const deleteMutation = useDeleteTask();
  const updateMutation = useUpdateTask();

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const onDelete = (task: Task) => deleteMutation.mutate(task._id);
  const onEdit = (task: Task) => setEditingTask(task);
  const closeEditModal = () => setEditingTask(null);
  const handleSave = (formData: TaskForm) => {
    if (!editingTask) return;
    updateMutation.mutate({
      id: editingTask._id,
      data: {
        title: formData.title,
        description: formData.description,
        assigneeEmails: formData.email.map((o: Option) => o.value),
      },
    });
    closeEditModal();
  };

  if (isLoading) return <div>Loading tasks…</div>;
  if (!data) return null;

  return (
    <>
      <ul className="space-y-4">
        {data.map((task) => (
          <li
            key={task._id}
            className="bg-white rounded-lg shadow p-4
                       flex flex-col space-y-2
                       sm:grid sm:grid-cols-[1fr_auto_auto_auto] sm:gap-4 sm:items-center sm:p-3 sm:space-y-0"
          >
            {/* Mobile: Title + Actions */}
            <div className="flex justify-between items-center sm:hidden">
              <div className="flex items-center space-x-2">
                <ListBulletIcon className="h-5 w-5 text-purple-500" />
                <span className="font-medium">{task.title}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onEdit(task)}
                  className="p-1 hover:bg-gray-100 rounded"
                  aria-label="Edit task"
                >
                  <PencilIcon className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={() => onDelete(task)}
                  className="p-1 hover:bg-red-100 rounded"
                  aria-label="Delete task"
                >
                  <TrashIcon className="h-5 w-5 text-red-600" />
                </button>
              </div>
            </div>

            {/* Mobile: Assignee + Status */}
            <div className="flex justify-between items-center text-sm text-gray-700 sm:hidden">
              <div className="flex items-center space-x-2 flex-1 truncate">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    task.assignedTo[0]
                  )}&color=7F9CF5&background=EBF4FF`}
                  alt={task.assignedTo[0]}
                  className="h-6 w-6 rounded-full flex-shrink-0"
                />
                <span className="truncate">{task.assignedTo.join(", ")}</span>
              </div>
              <span
                className={`ml-2 text-xs px-2 py-0.5 rounded-full ${getStatusClasses(
                  task.status
                )}`}
              >
                {task.status}
              </span>
            </div>

            {/* Desktop grid columns */}
            <div className="hidden sm:flex items-center space-x-2">
              <ListBulletIcon className="h-5 w-5 text-purple-500" />
              <span>{task.title}</span>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-700">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  task.assignedTo[0]
                )}&color=7F9CF5&background=EBF4FF`}
                alt={task.assignedTo[0]}
                className="h-6 w-6 rounded-full flex-shrink-0"
              />
              <span className="truncate">{task.assignedTo.join(", ")}</span>
            </div>
            <span
              className={`hidden sm:inline-block text-xs px-2 py-0.5 rounded-full justify-self-center ${getStatusClasses(
                task.status
              )}`}
            >
              {task.status}
            </span>
            <div className="hidden sm:flex justify-self-end items-center space-x-2">
              <button
                onClick={() => onEdit(task)}
                className="p-1 hover:bg-gray-100 rounded"
                aria-label="Edit task"
              >
                <PencilIcon className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={() => onDelete(task)}
                className="p-1 hover:bg-red-100 rounded"
                aria-label="Delete task"
              >
                <TrashIcon className="h-5 w-5 text-red-600" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editingTask && (
        <EditTaskModal
          isOpen
          onClose={closeEditModal}
          initialData={{
            title: editingTask.title,
            description: editingTask.description,
            email: editingTask.assignedTo.map((e) => ({
              value: e,
              label: e,
            })),
          }}
          onSave={handleSave}
        />
      )}
    </>
  );
}
