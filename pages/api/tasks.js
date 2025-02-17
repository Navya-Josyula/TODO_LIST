let tasks = [];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(tasks);
  } else if (req.method === 'POST') {
    const newTask = req.body;
    tasks.push(newTask);
    res.status(201).json(newTask);
  } else if (req.method === 'PUT') {
    const { id, updatedTask } = req.body;
    tasks = tasks.map(task => task.id === id ? updatedTask : task);
    res.status(200).json(updatedTask);
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    tasks = tasks.filter(task => task.id !== id);
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}