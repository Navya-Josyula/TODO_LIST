import { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const addTask = (name) => {
    const newTask = { id: Date.now(), name };
    fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    })
      .then(res => res.json())
      .then(data => setTasks([...tasks, data]));
  };

  const deleteTask = (id) => {
    fetch('/api/tasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
      .then(() => setTasks(tasks.filter(task => task.id !== id)));
  };

  const editTask = (task) => {
    setEditingTask(task);
  };

  const updateTask = (name) => {
    const updatedTask = { ...editingTask, name };
    fetch('/api/tasks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: updatedTask.id, updatedTask }),
    })
      .then(res => res.json())
      .then(data => {
        setTasks(tasks.map(task => task.id === data.id ? data : task));
        setEditingTask(null);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">To-Do List</h1>
      <TaskForm onSubmit={editingTask ? updateTask : addTask} editingTask={editingTask} />
      <TaskList tasks={tasks} onDelete={deleteTask} onEdit={editTask} />
    </div>
  );
}