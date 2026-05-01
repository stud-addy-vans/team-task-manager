import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/");

      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/projects`,
          config,
        );
        setProjects(response.data);
      } catch (err) {
        setError("Failed to fetch projects.");
      }
    };
    fetchProjects();
  }, [navigate]);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/projects`,
        { name: newProjectName },
        config,
      );

      setProjects([...projects, response.data]);
      setNewProjectName("");
    } catch (err) {
      setError("Failed to create project.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <h1 className="text-xl font-bold text-blue-600">Team Task Manager</h1>
        <div className="space-x-4">
          <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">
            Dashboard
          </Link>
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded-md"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-4xl p-8 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">My Projects</h2>
        </div>

        {error && (
          <div className="p-3 mb-4 text-red-700 bg-red-100 rounded">
            {error}
          </div>
        )}

        {/* Create Project Form */}
        <form onSubmit={handleCreateProject} className="flex gap-4 mb-8">
          <input
            type="text"
            required
            placeholder="New Project Name..."
            className="flex-1 px-4 py-2 border rounded-md"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Create Project
          </button>
        </form>

        {/* Projects List */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project._id}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <h3 className="text-lg font-bold text-gray-800">
                {project.name}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Role:{" "}
                {project.admin._id ===
                JSON.parse(localStorage.getItem("user"))._id
                  ? "Admin"
                  : "Member"}
              </p>
              <Link
                to={`/projects/${project._id}`}
                className="inline-block mt-4 text-sm font-medium text-blue-600 hover:underline"
              >
                View Tasks &rarr;
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Projects;
