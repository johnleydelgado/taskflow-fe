export default function TaskTableHeader() {
  return (
    <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-2 text-xs font-medium text-gray-500 uppercase">
      {/* 1. Task name aligns to start */}
      <div className="justify-self-start">Task name</div>

      {/* 2. Assignee (avatar + email) also aligns to start */}
      <div className="justify-self-start pr-6">Assignee</div>

      {/* 3. Status is centered */}
      <div className="justify-self-center pl-6">Status</div>

      {/* 4. Actions are aligned to the end */}
      <div className="justify-self-end pl-4">Actions</div>
    </div>
  );
}
