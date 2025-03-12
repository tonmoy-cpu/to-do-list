"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { addTask, fetchWeather } from "@/redux/actions";
import { AppDispatch } from "@/redux/store";
import { Task } from "@/types/task";

const TaskInput: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [reminder, setReminder] = useState("");
  const [category, setCategory] = useState("indoor");
  const [priority, setPriority] = useState("low");
  const [location, setLocation] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: title.trim(),
        reminder: reminder || null,
        completed: false,
        category: category as "indoor" | "outdoor",
        priority: priority as "low" | "medium" | "high",
        location: category === "outdoor" ? location : "",
      };
      dispatch(addTask(newTask));
      
      if (category === "outdoor" && location.trim()) {
        dispatch(fetchWeather(location.trim()));
      }

      setTitle("");
      setReminder("");
      setCategory("indoor");
      setPriority("low");
      setLocation("");
      onClose();
    }
  };

  return (
    <div className="mb-6 bg-white dark:bg-[#232323] p-4 rounded-lg shadow-lg border border-[#eef6ef] dark:border-[#2c2c2c] text-[#1b281b] dark:text-white">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          className="w-full p-2 border border-[#eef6ef] dark:border-[#2c2c2c] rounded bg-white dark:bg-[#2c2c2c] text-[#1b281b] dark:text-white placeholder-[#4f4f4f] dark:placeholder-[#bdbdbd] focus:outline-none focus:ring-1 focus:ring-[#3f9142]"
        />
        <input
          type="datetime-local"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
          className="w-full p-2 border border-[#eef6ef] dark:border-[#2c2c2c] rounded bg-white dark:bg-[#2c2c2c] text-[#1b281b] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#3f9142]"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-[#eef6ef] dark:border-[#2c2c2c] rounded bg-white dark:bg-[#2c2c2c] text-[#1b281b] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#3f9142] appearance-none"
        >
          <option value="indoor" className="bg-white dark:bg-[#242424] text-[#1b281b] dark:text-white">
            Indoor
          </option>
          <option value="outdoor" className="bg-white dark:bg-[#242424] text-[#1b281b] dark:text-white">
            Outdoor
          </option>
        </select>
        {category === "outdoor" && (
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="w-full p-2 border border-[#eef6ef] dark:border-[#2c2c2c] rounded bg-white dark:bg-[#2c2c2c] text-[#1b281b] dark:text-white placeholder-[#4f4f4f] dark:placeholder-[#bdbdbd] focus:outline-none focus:ring-1 focus:ring-[#3f9142]"
          />
        )}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 border border-[#eef6ef] dark:border-[#2c2c2c] rounded bg-white dark:bg-[#2c2c2c] text-[#1b281b] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#3f9142] appearance-none"
        >
          <option value="low" className="bg-white dark:bg-[#242424] text-[#1b281b] dark:text-white">
            Low
          </option>
          <option value="medium" className="bg-white dark:bg-[#242424] text-[#1b281b] dark:text-white">
            Medium
          </option>
          <option value="high" className="bg-white dark:bg-[#242424] text-[#1b281b] dark:text-white">
            High
          </option>
        </select>
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-[#eef6ef] dark:border-[#2c2c2c] text-[#3f9142] dark:text-[#98e19b] hover:bg-[#eef6ef] dark:hover:bg-[#2f3630]"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-[#3f9142] hover:bg-[#357937] text-white"
          >
            <Plus size={16} className="mr-2" /> Add Task
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaskInput;