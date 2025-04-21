/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
 
import React, { Fragment, useEffect } from "react";
import { createPortal } from "react-dom";
import { XMarkIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import Select from "react-select";
import { useUsers } from "~/api/user.query";
import { useForm, Controller } from "react-hook-form";
import { customStyles } from "./customStyles";

type Option = { value: string; label: string };

export interface TaskForm {
  email: Option[];        // multi‑select
  title: string;          // text input
  description: string;    // textarea
}

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: TaskForm) => Promise<any> | void;
}

export default function TaskModal({
  isOpen,
  onClose,
  onSave,
}: TaskModalProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskForm>({
    defaultValues: { email: [], title: "", description: "" },
  });

  const { data: users, isLoading: loadingUsers } = useUsers();
  const userOptions: Option[] =
    users?.map((u) => ({ value: u.email, label: u.email })) ?? [];

  // lock background scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // reset form when closed
  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  if (!isOpen) return null;

  const submitHandler = async (data: TaskForm) => {
    await onSave(data);
  };

  return createPortal(
    <Fragment>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <form
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-main-9">New Task</h2>
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-gray-500 hover:text-gray-700"
              disabled={isSubmitting}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-4 space-y-4">
            {/* Assignee Email */}
            <div>
              <label
                htmlFor="task-email"
                className="block text-sm font-medium mb-1 text-main-black"
              >
                Assignee Email
              </label>
              {loadingUsers ? (
                <div>Loading emails…</div>
              ) : (
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: "Select at least one email" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      inputId="task-email"
                      isMulti
                      options={userOptions}
                      styles={customStyles}
                      onChange={(val) => field.onChange(val)}
                      value={field.value}
                      isDisabled={isSubmitting}
                    />
                  )}
                />
              )}
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Title */}
            <div>
              <label
                htmlFor="task-title"
                className="block text-sm font-medium mb-1 text-main-black"
              >
                Title
              </label>
              <input
                id="task-title"
                {...register("title", {
                  required: "Title is required",
                  maxLength: { value: 80, message: "Max 80 characters" },
                })}
                type="text"
                disabled={isSubmitting}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-50 border-main-9 text-main-black disabled:opacity-50"
                placeholder="Enter title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="task-desc"
                className="block text-sm font-medium mb-1 text-main-black"
              >
                Task Description
              </label>
              <textarea
                id="task-desc"
                {...register("description", {
                  required: "Description is required",
                  maxLength: { value: 500, message: "Max 500 characters" },
                })}
                rows={4}
                disabled={isSubmitting}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-50 border-main-9 text-main-black disabled:opacity-50"
                placeholder="Describe the task…"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 flex items-center"
            >
              {isSubmitting ? (
                <>
                  <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                  Saving…
                </>
              ) : (
                "Save Task"
              )}
            </button>
          </div>
        </div>
      </form>
    </Fragment>,
    document.body
  );
}
