 
import { redirect } from "react-router";
import { getUser } from "~/utils/session";
import Sidebar from "./components/sidebar/Sidebar";
import ProjectHeader from "./components/header/ProjectHeader";
import Tabs from "./components/tasks/Tabs";
import Toolbar from "./components/tasks/Toolbar";
import TaskTableHeader from "./components/tasks/TaskTableHeader";
import TaskRow from "./components/tasks/TaskRow";
// import { useUsers } from "~/api/user.query";
export const clientLoader = () => {
  const user = getUser();
  if (!user) throw redirect("/login");
  return { user };
};

export default function Home() {
  // const { user } = useLoaderData<typeof clientLoader>();
  return(
    <div className="flex h-screen bg-gray-50 text-gray-800">
    {/* ─── Sidebar ─────────────────────────── */}
    <Sidebar/>

    {/* ─── Main Content ───────────────────── */}
    <main className="flex-1 overflow-y-auto p-6">
      {/* Project Header */}
     <ProjectHeader />

      {/* Tabs */}
      <Tabs />

      {/* Task List */}
      <section className="bg-white rounded-lg shadow overflow-hidden">
        {/* Toolbar */}
       <Toolbar />

        {/* Table Header */}
        <TaskTableHeader />

        {/* Section */}
        {/* <TaskSection /> */}

        {/* Tasks */}
        <TaskRow />
      </section>
    </main>
  </div>
  )
}