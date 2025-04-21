/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// app/components/Sidebar.tsx
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  PencilSquareIcon,
  PhotoIcon,
  DocumentIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  RectangleStackIcon,
  Cog6ToothIcon,
  PuzzlePieceIcon,
  UsersIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { ArrowLeftStartOnRectangleIcon, NumberedListIcon, } from "@heroicons/react/24/solid";

function SidebarItem({
  icon: Icon,
  label,
  active = false,
  badge,
}: {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  active?: boolean;
  badge?: number;
}) {
  return (
    <li>
      <a
        href="#"
        className={`flex items-center px-4 py-2 rounded-lg hover:bg-main-11 hover:text-fuchsia-50 ${
          active ? "bg-main-9 text-fuchsia-50 font-medium" : ""
        }`}
      >
        <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
        <span className="flex-1">{label}</span>
        {badge != null && (
          <span className="ml-2 inline-block text-xs bg-gray-200 px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </a>
    </li>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between bg-white p-4 shadow md:hidden">
        <button onClick={() => setOpen(true)}>
          <Bars3Icon className="h-6 w-6 text-gray-700" />
        </button>
        <div className="w-6" />
        <div className="items-center space-x-4 flex md:hidden">
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

      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 bottom-0 z-50 w-64 transform overflow-hidden bg-white
          shadow-lg rounded-lg transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:shadow-none md:rounded-none
        `}
      >
        <div className="md:hidden flex justify-end p-4">
          <button onClick={() => setOpen(false)}>
            <XMarkIcon className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        <div className="flex flex-col h-full">
          <div className="px-6 py-8 flex items-center space-x-2">
            <NumberedListIcon className="h-6 w-6 text-main-9" />
            <span className="text-xl font-bold text-main-9">TaskFlow</span>
          </div>

          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-1 px-2">
              <SidebarItem icon={HomeIcon} label="Dashboard" active />
              <SidebarItem icon={PencilSquareIcon} label="Posts" />
              <SidebarItem icon={PhotoIcon} label="Media" />
              <SidebarItem icon={DocumentIcon} label="Pages" />
              <SidebarItem
                icon={ChatBubbleOvalLeftEllipsisIcon}
                label="Comments"
                badge={1}
              />
              <SidebarItem icon={RectangleStackIcon} label="Appearance" />
              <SidebarItem icon={PuzzlePieceIcon} label="Plugins" />
              <SidebarItem icon={UsersIcon} label="Users" />
              <SidebarItem icon={Cog6ToothIcon} label="Settings" />
            </ul>
          </nav>

        <div className="px-4 md:py-6 py-24 space-y-4">
          {/* Dark Mode */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MoonIcon className="h-5 w-5 text-gray-600" />
              <span className="text-sm text-gray-700">Dark Mode</span>
            </div>
            <button
              onClick={() => setDark((d) => !d)}
              className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
                dark ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                  dark ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Logout */}
          <button
            onClick={() => {
              document.cookie = "user=; Path=/; Max-Age=0";
              window.location.href = "/login";
            }}
            className="w-full flex items-center justify-center space-x-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-300"
          >
            <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
        </div>
      </aside>
    </>
  );
}
