import React from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5080/api/tasks';

const TaskList = ({ tasks, onSelect, fetchTasks }) => {
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Due Date: {task.dueDate}</p>
          <button onClick={() => onSelect(task)}>View</button>
          <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
