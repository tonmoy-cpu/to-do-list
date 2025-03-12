"use client";
import React from "react";
import { MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask, setActiveDropdown } from "@/redux/actions";
import { AppDispatch, RootState } from "@/redux/store";
import { Task } from "@/types/task";
import calendarService from "@/services/calendarService";
import { cn } from "@/lib/utils";

const TaskOptions = ({ task }: { task: Task }) => {
  const activeDropdown = useSelector((state: RootState) => state.activeDropdown);
  const dispatch = useDispatch<AppDispatch>();
  const dropdownId = `task-${task.id}`; // Unique ID for each task's dropdown

  const handleEdit = (field: keyof Task, value: string | null) => {
    if (value !== null) {
      const updatedFields: Partial<Task> = { [field]: value };
      dispatch(updateTask(task.id, updatedFields));
    }
    dispatch(setActiveDropdown(null)); // Close dropdown after action
  };

  const handleAddToCalendar = () => {
    const result = calendarService.addToCalendar(task);
    if (!result) {
      alert("Cannot add to calendar: No reminder set for this task.");
    }
    dispatch(setActiveDropdown(null)); // Close dropdown after action
  };

  const toggleDropdown = () => {
    const newState = activeDropdown === dropdownId ? null : dropdownId;
    dispatch(setActiveDropdown(newState));
  };

  const getIconColor = () => {
    switch (task.priority) {
      case "high":
        return "text-red-500 dark:text-red-400";
      case "medium":
        return "text-yellow-500 dark:text-yellow-400";
      case "low":
        return "text-gray-500 dark:text-gray-400";
      default:
        return "text-gray-500 dark:text-gray-400";
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={cn("p-1 rounded-md hover:bg-gray-200 dark:hover:bg-[#2c2c2c]", getIconColor())}
      >
        <MoreHorizontal size={16} />
      </button>
      {activeDropdown === dropdownId && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#242424] border border-gray-200 dark:border-[#2c2c2c] rounded shadow-lg z-10">
          <button
            onClick={() => handleEdit("reminder", prompt("Set reminder (YYYY-MM-DDTHH:MM)", task.reminder || ""))}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#2c2c2c] text-[#1b281b] dark:text-white"
          >
            Set Reminder
          </button>
          <button
            onClick={() => handleEdit("reminder", prompt("Set due date (YYYY-MM-DDTHH:MM)", task.reminder || ""))}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#2c2c2c] text-[#1b281b] dark:text-white"
          >
            Due Date
          </button>
          <button
            onClick={() =>
              handleEdit(
                "priority",
                prompt("Set priority (high, medium, low)", task.priority) as "low" | "medium" | "high" | null
              )
            }
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#2c2c2c] text-[#1b281b] dark:text-white"
          >
            Set Priority
          </button>
          <button
            onClick={() => handleEdit("title", prompt("Edit task", task.title))}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#2c2c2c] text-[#1b281b] dark:text-white"
          >
            Edit Task
          </button>
          <button
            onClick={handleAddToCalendar}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#2c2c2c] text-[#1b281b] dark:text-white"
          >
            Add to Calendar
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskOptions;