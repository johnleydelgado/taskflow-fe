/* eslint-disable jsx-a11y/anchor-is-valid */
export default function Tabs() {
    return (
        <div className="border-b border-gray-200 mb-4">
        <nav className="-mb-px flex space-x-8 px-2">
          <a
            href="#"
            className="whitespace-nowrap py-3 px-1 border-b-2 border-purple-600 text-sm font-semibold text-main-9"
          >
            List
          </a>
          <a
            href="#"
            className="whitespace-nowrap py-3 px-1 border-b-2 border-transparent text-sm font-semibold text-gray-500 hover:text-gray-700 hover:border-gray-300"
          >
            Board
          </a>
        </nav>
      </div>
    );
  }
  
