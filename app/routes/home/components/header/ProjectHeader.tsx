import { ViewColumnsIcon } from "@heroicons/react/24/solid";

export default function ProjectHeader() {
  return (
    <header className="flex items-center justify-between mb-6">
    <div className="flex items-center space-x-4 md:mt-0 mt-24">
      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-300 flex items-center justify-center">
        <ViewColumnsIcon className="h-6 w-6 text-white" />
      </div>
      <div>
        <h2 className="text-2xl font-bold">Project</h2>
        <span className="inline-block mt-1 px-2 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full">
          Public
        </span>
      </div>
    </div>

    <div className="items-center space-x-4 md:flex hidden">
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="pl-3 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <svg
          className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
          />
        </svg>
      </div>
      <img
        src="https://i.pravatar.cc/32"
        alt="User avatar"
        className="h-8 w-8 rounded-full"
      />
    </div>
  </header>
  );
}
