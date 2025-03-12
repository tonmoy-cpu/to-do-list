"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, toggleTaskCompletion } from "@/redux/actions";
import { RootState, AppDispatch } from "@/redux/store";
import TaskOptions from "@/components/TaskOptions";
import { Task } from "@/types/task";

interface TaskListProps {
  activeTab: string;
  pendingReminders: Set<string>;
  setPendingReminders: React.Dispatch<React.SetStateAction<Set<string>>>;
  playingReminders: Map<string, HTMLAudioElement>;
  setPlayingReminders: React.Dispatch<React.SetStateAction<Map<string, HTMLAudioElement>>>;
  filteredTasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({
  activeTab,
  pendingReminders,
  setPendingReminders,
  playingReminders,
  setPlayingReminders,
  filteredTasks,
}) => {
  const weather = useSelector((state: RootState) => state.weather);
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteTask = (taskId: string) => {
    const audio = playingReminders.get(taskId);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.loop = false;
      setPlayingReminders((prev) => {
        const newMap = new Map(prev);
        newMap.delete(taskId);
        return newMap;
      });
    }
    setPendingReminders((prev) => {
      const updatedSet = new Set(prev);
      updatedSet.delete(taskId);
      return updatedSet;
    });
    dispatch(deleteTask(taskId));
  };

  const handleToggleCompletion = (taskId: string) => {
    const audio = playingReminders.get(taskId);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.loop = false;
      setPlayingReminders((prev) => {
        const newMap = new Map(prev);
        newMap.delete(taskId);
        return newMap;
      });
    }
    setPendingReminders((prev) => {
      const updatedSet = new Set(prev);
      updatedSet.delete(taskId);
      return updatedSet;
    });
    dispatch(toggleTaskCompletion(taskId));
  };

  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes("clear")) return "☀️";
    if (desc.includes("cloud")) return "☁️";
    if (desc.includes("rain") || desc.includes("shower")) return "🌧️";
    if (desc.includes("thunder")) return "⛈️";
    if (desc.includes("snow")) return "❄️";
    if (desc.includes("mist") || desc.includes("fog")) return "🌫️";
    return "🌡️";
  };

  return (
    <ul>
      {filteredTasks.map((task: Task) => {
        const taskWeather = task.location ? weather[task.location] : undefined;
        return (
          <li
            key={task.id}
            className={`flex justify-between items-center task-${task.priority} ${
              task.completed ? "line-through" : ""
            }`}
          >
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleCompletion(task.id)}
                className="h-5 w-5 text-[#3f9142] border-gray-300 rounded focus:ring-[#3f9142]"
              />
              <div>
                <span className="font-medium">
                  {task.title} ({task.category})
                </span>
                {task.category === "outdoor" && task.location && (
                  <p className="text-sm mt-1">
                    {taskWeather ? (
                      "error" in taskWeather ? (
                        <span className="weather-highlight">
                          Weather: {taskWeather.error}
                        </span>
                      ) : (
                        <span className="weather-highlight">
                          {getWeatherIcon(taskWeather.weather[0].description)}{" "}
                          {taskWeather.main.temp}°C, {taskWeather.weather[0].description}
                        </span>
                      )
                    ) : (
                      <span className="weather-highlight">Fetching weather...</span>
                    )}
                  </p>
                )}
                {task.reminder && (
                  <p className="text-sm text-muted-foreground">
                    Due: {new Date(task.reminder).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TaskOptions task={task} />
              <button
                onClick={() => handleDeleteTask(task.id)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out ${
                  task.priority === "high"
                    ? "bg-background text-foreground hover:bg-muted active:bg-muted/80"
                    : "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80"
                }`}
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TaskList;