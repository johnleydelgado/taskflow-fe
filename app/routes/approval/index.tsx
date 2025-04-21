// app/routes/ApprovalPage.tsx
import React,{useMemo} from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  LinkIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";
import { getUser } from "~/utils/session";
import { redirect, useLoaderData } from "react-router";
import { useTokenValidity, useTaskStatus, useTaskRespond, useGetTaskByToken } from "~/api/task.query";
import { format, parseISO } from "date-fns";


// Sample timeline entry (you can replace this with real fetch-via-token)


export const clientLoader = ({
  params,
}: {
  params: { token?: string };
}) => {
  const user = getUser();
  if (!user) throw redirect("/login");
  const token = params.token ?? "";
  return { token };
};

export default function ApprovalPage() {
  const { token } = useLoaderData<typeof clientLoader>();
  const taskRepond = useTaskRespond();

  const { data:taskData, isLoading:fetchingTask,isFetching:refetchingTask } = useGetTaskByToken(token);


  // 1) Check validity
  const {
    data: validity,
    isLoading: validating,
    error: validError,
  } = useTokenValidity(token);

  // 2) Fetch status
  const {
    data: statusData,
    isLoading: fetchingStatus,
    error: statusError,
  } = useTaskStatus(token);

  const handleTaskRespond = (status:'approve' | 'reject') => {
    taskRepond.mutate({
      token,
      data: {
       token,
       action: status,
      },
    });
  };


  const createdDate = useMemo(() => {
    return taskData?.createdAt ? parseISO(taskData.createdAt) : null;
  }, [taskData?.createdAt]);

  const formattedDate = useMemo(() => {
    return createdDate ? format(createdDate, "MMMM d") : "";
  }, [createdDate]);

  const formattedTime = useMemo(() => {
    return createdDate ? format(createdDate, "h:mm a") : "";
  }, [createdDate]);

  // 3) Loading state
  if (validating || fetchingStatus || fetchingTask || refetchingTask) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ArrowPathIcon className="w-8 h-8 text-gray-500 animate-spin" />
      </div>
    );
  }

  // 4) Expired or invalid token
  if (validError || !validity?.valid) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-sm w-full bg-white rounded-xl shadow-lg p-6 text-center">
          <LinkIcon className="mx-auto mb-4 w-12 h-12 text-blue-500" />
          <h1 className="text-xl font-semibold text-gray-800">
            Your Token has expired
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Please contact your manager for a fresh approval request.
          </p>
        </div>
      </div>
    );
  }

  // 5) Error fetching status
  if (statusError || !statusData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <p className="text-red-500">Failed to load approval status.</p>
      </div>
    );
  }

  const currentStatus = statusData.status; // "pending"|"approved"|"rejected"

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-800">
          Task Approval
        </h1>
        <p className="text-gray-500 mt-1">Digital Approval page</p>

        {/* Task title & description */}
        <div className="mt-4">
          <h2 className="text-lg font-medium text-gray-800">
            {taskData?.title}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {taskData?.description}
          </p>
        </div>

        {/* Timeline */}
        <ul className="mt-6 relative">
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200" />
            <li
              className="relative flex items-start mb-8 last:mb-0"
            >
              {/* Dot */}
              <span
                className={`z-10 flex items-center justify-center w-6 h-6 rounded-full ${
                  taskData?.status === "Approved"
                    ? "bg-green-100"
                    : "bg-white border-2 border-gray-300"
                }`}
              >
                {taskData?.status === "Approved" ? (
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                ) : (
                  <span className="block w-2 h-2 rounded-full bg-gray-300" />
                )}
              </span>

              <div className="ml-4 w-full">
                <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-700">
                  {formattedDate}
                </p>
                  {taskData?.createdAt&& (
                    <p className="text-sm text-gray-500">
                     {formattedTime}
                    </p>
                  )}
                </div>
                <div className="mt-2 flex items-center">
                  <img
                    src="https://i.pravatar.cc/32"
                    alt="User avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-semibold text-gray-800">
                      Your Manager
                    </p>
                    <p className="text-xs text-gray-500">
                      Manager
                    </p>
                  </div>
                </div>
                {taskData?.responded && (
                  <div className="mt-3 p-3 bg-gray-100 rounded-lg text-sm text-gray-700">
                    {taskData.responded}
                  </div>
                )}
              </div>
            </li>
        </ul>

        {/* Status badge or action buttons */}
        <div className="mt-6 flex justify-center">
          {currentStatus === "pending" ? (
            <div className="space-x-4">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => handleTaskRespond('reject')}
              >
                Reject
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" 
                onClick={() => handleTaskRespond('approve')}
              >
                Approve
              </button>
            </div>
          ) : (
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                currentStatus === "approved"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {currentStatus === "approved" ? (
                <CheckCircleIcon className="w-5 h-5 mr-1" />
              ) : (
                <XCircleIcon className="w-5 h-5 mr-1" />
              )}
              {currentStatus === "approved"
                ? "Approved"
                : "Rejected"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
