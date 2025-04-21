// app/components/EditTaskModal.tsx
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Fragment, useEffect } from "react";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Select from "react-select";
import { useUsers } from "~/api/user.query";
import { useForm, Controller } from "react-hook-form";
import { customStyles } from "./customStyles";

export type Option = { value: string; label: string };

export interface TaskForm {
  email: Option[];
  title: string;
  description: string;
}

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: TaskForm) => void;
  initialData: TaskForm;
}

export default function EditTaskModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: EditTaskModalProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskForm>({
    defaultValues: initialData,
  });
  const { data: users, isLoading } = useUsers();

  // Reset when modal closes or initialData changes
  useEffect(() => {
    if (!isOpen) reset(initialData);
  }, [isOpen, initialData, reset]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const userOptions: Option[] =
  users?.map((u) => ({ value: u.email, label: u.email })) ?? [];

  const onSubmit = (data: TaskForm) => {
     onSave(data);
  };

  if (!isOpen) return null;


  return createPortal(
    <Fragment>
      <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />

      <form
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-main-9">Edit Task</h2>
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-gray-500 hover:bg-main-9 rounded-full hover:text-white"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-4 space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="task-email"
                className="block text-sm font-medium mb-1 text-main-black"
              >
                Assignee Email
              </label>
              {isLoading ? (
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
                  maxLength: { value: 80, message: "Max length is 80" },
                })}
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-50 border-main-9 text-main-black"
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
                  maxLength: { value: 500, message: "Max length is 500" },
                })}
                rows={4}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-50 border-main-9 text-main-black"
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
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </Fragment>,
    document.body
  );
}
