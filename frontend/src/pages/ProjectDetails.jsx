import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const ProjectDetails = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState('');
    
    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Medium');

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('token');
            if (!token) return navigate('/');

            try {
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, config);
                setTasks(response.data);
            } catch (err) {
                setError('Failed to fetch tasks.');
            }
        };
        fetchTasks();
    }, [id, navigate]);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const payload = {
                title,
                description,
                dueDate,
                priority,
                project: id
            };

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/tasks`, payload, config);
            
            // Add new task to UI and clear form
            setTasks([...tasks, response.data]);
            setTitle('');
            setDescription('');
            setDueDate('');
            setPriority('Medium');
        } catch (err) {
            setError('Failed to create task.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
                <h1 className="text-xl font-bold text-blue-600">Team Task Manager</h1>
                <div className="space-x-4">
                    <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</Link>
                    <Link to="/projects" className="text-gray-600 hover:text-blue-600">Projects</Link>
                </div>
            </nav>

            <main className="max-w-5xl p-8 mx-auto">
                <h2 className="mb-6 text-2xl font-bold text-gray-800">Project Tasks</h2>
                {error && <div className="p-3 mb-4 text-red-700 bg-red-100 rounded">{error}</div>}

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm h-fit">
                        <h3 className="mb-4 text-lg font-bold text-gray-800">Add New Task</h3>
                        <form onSubmit={handleCreateTask} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input type="text" required className="w-full px-3 py-2 mt-1 border rounded-md" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea className="w-full px-3 py-2 mt-1 border rounded-md" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                                <input type="date" required className="w-full px-3 py-2 mt-1 border rounded-md" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Priority</label>
                                <select className="w-full px-3 py-2 mt-1 border rounded-md" value={priority} onChange={(e) => setPriority(e.target.value)}>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                            <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                                Create Task
                            </button>
                        </form>
                    </div>

                    <div className="lg:col-span-2 space-y-4">
                        {tasks.length === 0 ? (
                            <div className="p-8 text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm">
                                No tasks found for this project. Create one to get started!
                            </div>
                        ) : (
                            tasks.map((task) => (
                                <div key={task._id} className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm flex justify-between items-start">
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-800">{task.title}</h4>
                                        <p className="mt-1 text-sm text-gray-600">{task.description}</p>
                                        <div className="mt-4 space-x-2 text-xs font-medium">
                                            <span className={`px-2 py-1 rounded-full ${task.priority === 'High' ? 'bg-red-100 text-red-800' : task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                                {task.priority} Priority
                                            </span>
                                            <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
                                                Status: {task.status}
                                            </span>
                                            <span className="px-2 py-1 text-blue-800 bg-blue-100 rounded-full">
                                                Due: {new Date(task.dueDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProjectDetails;