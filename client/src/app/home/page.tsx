"use client";
import React, { useState } from "react";

export default function Home() {
  // useState for task input fields
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  // useState for tasks list (if needed)
  const [tasks, setTasks] = useState<string[]>([]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-6 border rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Task Manager</h1>

        {/* Task Name */}
        <div className="mb-4">
          <label htmlFor="taskName" className="block text-gray-600 font-semibold mb-2">
            Task Name
          </label>
          <input type="text" id="taskName" name="taskName" className="w-full p-2 border rounded" value={taskName} onChange={(e) => setTaskName(e.target.value)} required />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-600 font-semibold mb-2">
            Description
          </label>
          <textarea id="description" name="description" className="w-full p-2 border rounded" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        {/* Due Date */}
        <div className="mb-4">
          <label htmlFor="dueDate" className="block text-gray-600 font-semibold mb-2">
            Due Date
          </label>
          <input type="date" id="dueDate" name="dueDate" className="w-full p-2 border rounded" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>

        {/* Task Action Buttons */}
        <div className="flex space-x-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Complete</button>
        </div>

        {/* Tasks List (if needed) */}
        {/* <ul>
            {tasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul> */}
      </div>
    </div>
  );
}
