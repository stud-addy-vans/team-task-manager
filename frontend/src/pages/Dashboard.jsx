import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardStats = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/dashboard`,
          config,
        );

        setStats(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch dashboard data.");
        setLoading(false);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/");
        }
      }
    };

    fetchDashboardStats();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-600">
        Loading dashboard...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-red-500">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <h1 className="text-xl font-bold text-blue-600">Team Task Manager</h1>
        <div className="space-x-4">
          <Link
            to="/projects"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Projects
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-red-600 transition border border-red-600 rounded-md hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Dashboard Content */}
      <main className="max-w-6xl p-8 mx-auto">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Dashboard Overview
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Stat Cards */}
          <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Total Tasks</h3>
            <p className="mt-2 text-3xl font-bold text-gray-800">
              {stats.totalTasks}
            </p>
          </div>

          <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">To Do</h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {stats.tasksByStatus.todo}
            </p>
          </div>

          <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">In Progress</h3>
            <p className="mt-2 text-3xl font-bold text-yellow-500">
              {stats.tasksByStatus.inProgress}
            </p>
          </div>

          <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Completed</h3>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {stats.tasksByStatus.done}
            </p>
          </div>

          <div className="p-6 border rounded-lg shadow-sm bg-red-50 border-red-100 lg:col-span-4">
            <h3 className="text-sm font-medium text-red-800">Overdue Tasks</h3>
            <p className="mt-2 text-3xl font-bold text-red-600">
              {stats.overdueTasks}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
