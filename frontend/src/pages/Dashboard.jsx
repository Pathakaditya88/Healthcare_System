import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  User, 
  LogOut, 
  Activity,
  Clock,
  ClipboardCheck,
  MoreVertical
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
      fetchAppointments(token);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const fetchAppointments = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/appointments/my', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/', { replace: true });
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
            <p className="text-gray-500">You have {appointments.length} upcoming appointments.</p>
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
              <p className="text-sm text-gray-500">Next Visit</p>
              <p className="text-lg font-bold">
                {appointments.length > 0 ? new Date(appointments[0].date).toLocaleDateString() : 'No pending'}
              </p>
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

        {/* Appointments Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">Upcoming Appointments</h3>
            <button className="text-blue-600 text-sm font-semibold hover:underline">+ Book New</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
                <tr>
                  <th className="px-6 py-4 font-semibold">Doctor</th>
                  <th className="px-6 py-4 font-semibold">Reason</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr><td colSpan="5" className="text-center py-10 text-gray-400">Loading appointments...</td></tr>
                ) : appointments.length === 0 ? (
                  <tr><td colSpan="5" className="text-center py-10 text-gray-400">No appointments found.</td></tr>
                ) : (
                  appointments.map((apt) => (
                    <tr key={apt._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-medium text-gray-800">{apt.doctorName}</td>
                      <td className="px-6 py-4 text-gray-600">{apt.reason}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(apt.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          apt.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {apt.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={18}/></button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;