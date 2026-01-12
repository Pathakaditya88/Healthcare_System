import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  User, 
  LogOut, 
  Activity,
  Clock,
  ClipboardCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // If no user is found, kick them back to login
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-2 border-b border-gray-100">
          <Activity className="text-blue-600 w-8 h-8" />
          <span className="font-bold text-xl text-gray-800">HealthSync</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button className="flex items-center gap-3 w-full p-3 bg-blue-50 text-blue-700 rounded-xl font-medium">
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button className="flex items-center gap-3 w-full p-3 text-gray-600 hover:bg-gray-50 rounded-xl transition">
            <Calendar size={20} /> Appointments
          </button>
          <button className="flex items-center gap-3 w-full p-3 text-gray-600 hover:bg-gray-50 rounded-xl transition">
            <FileText size={20} /> Health Records
          </button>
          <button className="flex items-center gap-3 w-full p-3 text-gray-600 hover:bg-gray-50 rounded-xl transition">
            <User size={20} /> Profile
          </button>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 text-red-600 hover:bg-red-50 rounded-xl transition font-medium"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user.name}!</h1>
            <p className="text-gray-500">Here's what's happening with your health today.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-800 uppercase">{user.role}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {user.name[0]}
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-xl text-blue-600"><Clock /></div>
            <div>
              <p className="text-sm text-gray-500">Next Appointment</p>
              <p className="text-lg font-bold">Tomorrow, 10:00 AM</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-xl text-green-600"><ClipboardCheck /></div>
            <div>
              <p className="text-sm text-gray-500">Total Records</p>
              <p className="text-lg font-bold">12 Reports</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-xl text-purple-600"><Activity size={24}/></div>
            <div>
              <p className="text-sm text-gray-500">Blood Group</p>
              <p className="text-lg font-bold">O Positive</p>
            </div>
          </div>
        </div>

        {/* Placeholder for Appointments Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Upcoming Appointments</h3>
          <div className="h-40 flex items-center justify-center border-2 border-dashed border-gray-100 rounded-xl">
            <p className="text-gray-400">No appointments scheduled for this week.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;