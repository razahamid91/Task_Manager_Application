import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5080/api/tasks';

const TaskEditForm = ({ task, fetchTasks, onEditToggle }) => {
  const [updatedTask, setUpdatedTask] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate, 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/${task.id}`, updatedTask);
      fetchTasks();
      onEditToggle();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <form onSubmit={handleUpdateTask}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={updatedTask.title}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={updatedTask.description}
        onChange={handleInputChange}
      />
      <input
        type="date"
        name="dueDate"
        value={updatedTask.dueDate}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Update Task</button>
    </form>
  );
};

export default TaskEditForm;
