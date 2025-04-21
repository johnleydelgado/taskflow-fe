 
import { PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import TaskModal, { type TaskForm } from "../modal/TaskModal";
import { useCreateTaskEmail } from "~/api/task.query";

export default function Toolbar() {

  const [showModal, setShowModal] = useState(false);
  const { mutate } = useCreateTaskEmail();
  function handleSave(data: TaskForm) {
    setShowModal(false);
    data.email.map((email) =>  mutate({
      title: data.title,
      description:data.description,
      assigneeEmails: [email.value],
    }))
   
  }
  
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-100">  
     <TaskModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
    />
    <div className="flex items-center space-x-4 text-sm text-gray-500">
      <button className="flex items-center space-x-1 hover:text-gray-700">
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4h18M3 12h18M3 20h18"
          />
        </svg>
        <span>Sort</span>
      </button>
    </div>
    <button className="flex items-center space-x-1 text-sm bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg" onClick={() => setShowModal(true)}>
      <PlusIcon className="h-5 w-5" />
      <span>Add task</span>
    </button>
  </div>
  );
}

