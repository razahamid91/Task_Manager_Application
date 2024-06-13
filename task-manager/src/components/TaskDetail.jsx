import React from 'react';

const TaskDetail = ({ task, onEditToggle }) => {
  return (
    <div>
      <h2>Task Details</h2>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due Date: {task.dueDate}</p>
      <button onClick={onEditToggle}>Edit</button>
    </div>
  );
};

export default TaskDetail;
