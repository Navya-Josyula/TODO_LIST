export default function TaskList({ tasks, onDelete, onEdit }) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id} className="flex justify-between items-center mb-2">
          <span>{task.name}</span>
          <div>
            <button onClick={() => onEdit(task)} className="bg-yellow-500 text-white p-2 mr-2">Edit</button>
            <button onClick={() => onDelete(task.id)} className="bg-red-500 text-white p-2">Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}