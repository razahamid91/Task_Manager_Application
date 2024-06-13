import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5080/api/tasks';

const TaskForm = ({ fetchTasks }) => {
  const [task, setTask] = useState({ title: '', description: '', dueDate: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_BASE_URL, task);
      setTask

      ({ title: '', description: '', dueDate: '' });
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <form onSubmit={handleAddTask}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={task.title}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={task.description}
        onChange={handleInputChange}
      />
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
