import { useEffect, useState } from 'react';

export default function TaskForm({ onSubmit, editingTask }) {
  const [task, setTask] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTask(editingTask.name);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
    setTask('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="border p-2 mr-2"
        placeholder="Enter task"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        {editingTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
}