import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
import TaskEditForm from './components/TaskEditForm';

const API_BASE_URL = 'http://localhost:5080/api/tasks';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm fetchTasks={fetchTasks} />
      <TaskList tasks={tasks} onSelect={handleTaskSelect} fetchTasks={fetchTasks} />
      {selectedTask && !isEditing && (
        <TaskDetail task={selectedTask} onEditToggle={handleEditToggle} />
      )}
      {selectedTask && isEditing && (
        <TaskEditForm task={selectedTask} fetchTasks={fetchTasks} onEditToggle={handleEditToggle} />
      )}
    </div>
  );
};

export default App;
