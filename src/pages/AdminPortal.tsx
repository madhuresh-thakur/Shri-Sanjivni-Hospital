import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy, updateDoc, doc, addDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { useAuth } from '../AuthContext';
import { handleFirestoreError, OperationType } from '../lib/firebaseUtils';
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search, 
  Plus, 
  Trash2,
  Filter,
  MoreVertical,
  Activity,
  User as UserIcon,
  Phone,
  Mail,
  X,
  Download,
  MessageSquare,
  Send,
  PieChart as PieIcon,
  BarChart as BarIcon,
  LayoutDashboard
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend
} from 'recharts';
import { DEPARTMENTS, DOCTORS } from '@/src/data';
import { cn } from '@/src/lib/utils';
import { Navigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

interface Booking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  departmentId: string;
  doctorId: string;
  date: string;
  message: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: any;
}

export default function AdminPortal() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'list'>('dashboard');

  // Form State
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPhone: '',
    departmentId: '',
    doctorId: '',
    date: '',
    message: ''
  });

  // Notification State
  const [notifyingBooking, setNotifyingBooking] = useState<Booking | null>(null);

  // Security Check: Only allow admin email
  if (!user || (user.email !== 'admin123@gmail.com' && user.email !== 'thakurmadhuresh1808@gmail.com')) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Booking[];
      setBookings(fetched);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'bookings');
    });

    return unsubscribe;
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'bookings', id), {
        status: newStatus
      });
      // Find the booking to trigger notification prompt
      const booking = bookings.find(b => b.id === id);
      if (booking) {
        setNotifyingBooking({ ...booking, status: newStatus as any });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `bookings/${id}`);
    }
  };

  const handleSendWhatsApp = (booking: Booking) => {
    const dept = DEPARTMENTS.find(d => d.id === booking.departmentId)?.name || 'General';
    const message = booking.status === 'confirmed' 
      ? `Hello *${booking.userName}*, your appointment at *Shri Sanjivni* (${dept}) on *${booking.date}* has been *CONFIRMED*. See you soon!`
      : `Hello *${booking.userName}*, your appointment at *Shri Sanjivni* on *${booking.date}* has been *CANCELLED*. Please contact us to reschedule.`;
    
    // Clean phone number (remove non-digits)
    const phone = booking.userPhone.replace(/\D/g, '');
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleSendEmail = (booking: Booking) => {
    const dept = DEPARTMENTS.find(d => d.id === booking.departmentId)?.name || 'General';
    const subject = `Appointment ${booking.status.toUpperCase()} - Shri Sanjivni`;
    const body = booking.status === 'confirmed'
      ? `Hello ${booking.userName},\n\nYour appointment at Shri Sanjivni for the ${dept} department on ${booking.date} has been confirmed.\n\nThank you,\nShri Sanjivni Admin`
      : `Hello ${booking.userName},\n\nUnfortunately, your appointment at Shri Sanjivni on ${booking.date} has been cancelled. Please reach out to us at your earliest convenience to reschedule.\n\nBest regards,\nShri Sanjivni Admin`;
    
    window.location.href = `mailto:${booking.userEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    try {
      await deleteDoc(doc(db, 'bookings', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `bookings/${id}`);
    }
  };

  const handleAddBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await addDoc(collection(db, 'bookings'), {
        ...formData,
        userId: 'admin-manual',
        status: 'confirmed',
        createdAt: serverTimestamp()
      });
      setShowAddModal(false);
      setFormData({
        userName: '',
        userEmail: '',
        userPhone: '',
        departmentId: '',
        doctorId: '',
        date: '',
        message: ''
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'bookings');
    } finally {
      setFormLoading(false);
    }
  };

  const handleExportExcel = () => {
    // 1. Prepare Main Data sheet
    const mainData = bookings.map((booking, index) => {
      const dept = DEPARTMENTS.find(d => d.id === booking.departmentId);
      const doc = DOCTORS.find(d => d.id === booking.doctorId);
      
      return {
        'S.No': index + 1,
        'Booking ID': booking.id,
        'Patient Name': booking.userName,
        'Email': booking.userEmail,
        'Phone': booking.userPhone,
        'Department': dept?.name || 'N/A',
        'Doctor': doc?.name || 'N/A',
        'Appointment Date': booking.date,
        'Status': booking.status.toUpperCase(),
        'Created At': booking.createdAt?.toDate ? booking.createdAt.toDate().toLocaleString() : 'N/A',
        'Message': booking.message || ''
      };
    });

    // 2. Prepare Summary Sheet
    const statusCounts = bookings.reduce((acc, b) => {
      acc[b.status] = (acc[b.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const deptCounts = bookings.reduce((acc, b) => {
      const dept = DEPARTMENTS.find(d => d.id === b.departmentId)?.name || 'Unknown';
      acc[dept] = (acc[dept] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const summaryData = [
      { Category: 'Total Bookings', Value: bookings.length },
      { Category: 'Confirmed', Value: statusCounts.confirmed || 0 },
      { Category: 'Pending', Value: statusCounts.pending || 0 },
      { Category: 'Cancelled', Value: statusCounts.cancelled || 0 },
      { Category: '', Value: '' },
      { Category: 'Department Breakdown', Value: '' },
      ...Object.entries(deptCounts).map(([name, count]) => ({
        Category: name,
        Value: count
      }))
    ];

    // Create workbook
    const workbook = XLSX.utils.book_new();
    
    // Add Summary sheet first
    const summarySheet = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Analytics Summary');

    // Add Detailed Data sheet
    const mainSheet = XLSX.utils.json_to_sheet(mainData);
    XLSX.utils.book_append_sheet(workbook, mainSheet, 'All Bookings');

    // Export to file
    const fileName = `Shri_Sanjivni_Premium_Report_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  // Prepare Chart Data
  const statusChartData = [
    { name: 'Pending', value: bookings.filter(b => b.status === 'pending').length, color: '#f59e0b' },
    { name: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, color: '#10b981' },
    { name: 'Cancelled', value: bookings.filter(b => b.status === 'cancelled').length, color: '#ef4444' },
  ];

  const deptChartData = DEPARTMENTS.map(dept => ({
    name: dept.name,
    count: bookings.filter(b => b.departmentId === dept.id).length
  })).filter(d => d.count > 0);

  // Growth Data (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  }).reverse();

  const growthData = last7Days.map(day => ({
    date: day,
    count: bookings.filter(b => b.date === day).length
  }));

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         b.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-medical-navy tracking-tighter mb-2">System Control Hub</h1>
            <p className="text-slate-400 font-medium">Manage clinical operations and patient logistics.</p>
          </div>
          
          <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all",
                activeTab === 'dashboard' ? "bg-medical-navy text-white shadow-lg shadow-medical-navy/20" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <LayoutDashboard size={18} /> Dashboard
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all",
                activeTab === 'list' ? "bg-medical-navy text-white shadow-lg shadow-medical-navy/20" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <Users size={18} /> Patient List
            </button>
          </div>
        </div>

        {activeTab === 'dashboard' ? (
          <div className="space-y-8">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Volume', value: bookings.length, icon: Activity, color: 'text-primary', bg: 'bg-primary/5' },
                { label: 'Active Queue', value: bookings.filter(b => b.status === 'pending').length, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
                { label: 'Success Rate', value: `${bookings.length ? Math.round((bookings.filter(b => b.status === 'confirmed').length / bookings.length) * 100) : 0}%`, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
                { label: 'Growth/Day', value: growthData[growthData.length - 1].count, icon: Plus, color: 'text-blue-500', bg: 'bg-blue-50' },
              ].map((stat, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6"
                >
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0", stat.bg, stat.color)}>
                    <stat.icon size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{stat.label}</p>
                    <p className={cn("text-3xl font-black tracking-tighter", stat.color)}>{stat.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Trends Area Chart */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="md:col-span-2 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm"
              >
                <div className="flex justify-between items-center mb-8">
                   <h3 className="text-xl font-bold tracking-tight">Booking Velocity (Last 7 Days)</h3>
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <div className="w-3 h-3 rounded-full bg-primary" /> Daily Load
                   </div>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={growthData}>
                      <defs>
                        <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="date" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: '#94a3b8', fontSize: 10}}
                        format={(val) => val.split('-').slice(1).join('/')}
                      />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                      />
                      <Area type="monotone" dataKey="count" stroke="#0ea5e9" strokeWidth={4} fillOpacity={1} fill="url(#colorCount)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Status Distribution Pie Chart */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-medical-navy p-8 rounded-[3.5rem] shadow-xl text-white overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <h3 className="text-xl font-bold mb-8 relative z-10">Triage Overview</h3>
                <div className="h-[250px] w-full relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusChartData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={10}
                        dataKey="value"
                      >
                        {statusChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} cornerRadius={10} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4 relative z-10">
                  {statusChartData.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}} />
                        <span className="text-sm font-medium text-white/70">{item.name}</span>
                      </div>
                      <span className="font-bold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Department Load Bar Chart */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm"
            >
              <h3 className="text-2xl font-bold tracking-tighter mb-10 text-medical-navy">Specialized Load Distribution</h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={deptChartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}}
                      />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                      <Tooltip 
                        cursor={{fill: '#f8fafc'}}
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                      />
                      <Bar 
                        dataKey="count" 
                        fill="#0ea5e9" 
                        radius={[6, 6, 0, 0]} 
                        barSize={60}
                      >
                         {deptChartData.map((_, index) => (
                           <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#0ea5e9' : '#0369a1'} />
                         ))}
                      </Bar>
                   </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex-1 w-full relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Filter by patient identity or record..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-16 pr-6 py-5 bg-white border border-slate-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold text-medical-navy shadow-sm"
                />
              </div>
              
              <div className="flex gap-4 w-full md:w-auto">
                <button
                  onClick={handleExportExcel}
                  className="bg-accent text-medical-navy px-8 py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 hover:translate-y-[-2px] active:translate-y-0 transition-all shadow-xl shadow-accent/20 whitespace-nowrap"
                >
                  <Download className="h-4 w-4" /> Download Intelligence
                </button>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-white px-6 py-5 rounded-[1.5rem] border border-slate-100 font-bold text-slate-600 outline-none focus:ring-4 focus:ring-primary/10 shadow-sm cursor-pointer"
                >
                  <option value="all">Full Spectrum</option>
                  <option value="pending">Awaiting Sync</option>
                  <option value="confirmed">Verified Access</option>
                  <option value="cancelled">Terminated</option>
                </select>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-primary text-white px-8 py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 hover:bg-medical-teal transition-all shadow-xl shadow-primary/20 whitespace-nowrap active:scale-95"
                >
                  <Plus className="h-4 w-4" /> New Protocol
                </button>
              </div>
            </div>

            {/* Premium Table View */}
            <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                      <th className="px-10 py-8">Patient Profile</th>
                      <th className="px-10 py-8">Logistics</th>
                      <th className="px-10 py-8">Encryption Status</th>
                      <th className="px-10 py-8 text-right">Secure Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredBookings.map((booking) => {
                      const dept = DEPARTMENTS.find(d => d.id === booking.departmentId);
                      const doc = DOCTORS.find(d => d.id === booking.doctorId);
                      return (
                        <tr key={booking.id} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-10 py-8">
                            <div className="flex items-center gap-6">
                               <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                  {booking.userName[0]}
                               </div>
                               <div>
                                  <p className="font-bold text-medical-navy text-lg tracking-tight mb-1">{booking.userName}</p>
                                  <p className="text-xs text-slate-400 font-medium tracking-wide flex items-center gap-2">
                                     <Mail size={12} /> {booking.userEmail}
                                  </p>
                               </div>
                            </div>
                          </td>
                          <td className="px-10 py-8">
                            <div className="space-y-2">
                               <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-primary" />
                                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">{dept?.name}</span>
                               </div>
                               <p className="text-sm font-bold text-slate-600 pl-4">{booking.date}</p>
                            </div>
                          </td>
                          <td className="px-10 py-8">
                            <span className={cn(
                              "px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm flex items-center gap-2 w-fit",
                              booking.status === 'confirmed' ? 'bg-green-50 text-green-700 border-green-100' :
                              booking.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-100' :
                              'bg-amber-50 text-amber-700 border-amber-100'
                            )}>
                              <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", 
                                 booking.status === 'confirmed' ? 'bg-green-500' : 
                                 booking.status === 'cancelled' ? 'bg-red-500' : 'bg-amber-500'
                              )} />
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-10 py-8 text-right">
                            <div className="flex items-center justify-end gap-3">
                              <button 
                                onClick={() => handleSendWhatsApp(booking)}
                                className="w-10 h-10 flex items-center justify-center text-green-500 hover:bg-green-50 rounded-xl transition-all"
                                title="Sync WhatsApp"
                              >
                                <MessageSquare size={18} />
                              </button>
                              <button 
                                onClick={() => handleSendEmail(booking)}
                                className="w-10 h-10 flex items-center justify-center text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                                title="Sync Email"
                              >
                                <Mail size={18} />
                              </button>
                              <div className="w-px h-8 bg-slate-100 mx-2" />
                              {booking.status === 'pending' && (
                                <>
                                  <button 
                                    onClick={() => handleUpdateStatus(booking.id, 'confirmed')}
                                    className="w-10 h-10 flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-white rounded-xl transition-all shadow-sm"
                                    title="Authorize"
                                  >
                                    <CheckCircle size={18} />
                                  </button>
                                  <button 
                                    onClick={() => handleUpdateStatus(booking.id, 'cancelled')}
                                    className="w-10 h-10 flex items-center justify-center text-red-400 hover:bg-red-50 rounded-xl transition-all"
                                    title="Void"
                                  >
                                    <XCircle size={18} />
                                  </button>
                                </>
                              )}
                              <button 
                                onClick={() => handleDelete(booking.id)}
                                className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                title="Terminate Record"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              {filteredBookings.length === 0 && (
                <div className="py-32 text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                    <Search size={40} />
                  </div>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No matching patient records found in terminal.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Notification Success Modal */}
      <AnimatePresence>
        {notifyingBooking && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setNotifyingBooking(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl relative z-10 text-center"
            >
              <div className={cn(
                "w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6",
                notifyingBooking.status === 'confirmed' ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500"
              )}>
                <Send className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Status Updated!</h3>
              <p className="text-slate-500 mb-8">
                Appointment is now <strong>{notifyingBooking.status}</strong>. 
                Would you like to notify <strong>{notifyingBooking.userName}</strong>?
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    handleSendWhatsApp(notifyingBooking);
                    setNotifyingBooking(null);
                  }}
                  className="flex flex-col items-center gap-2 p-4 bg-green-50 rounded-2xl border border-green-100 hover:bg-green-100 transition-all font-bold text-green-700"
                >
                  <MessageSquare className="h-6 w-6" />
                  WhatsApp
                </button>
                <button
                  onClick={() => {
                    handleSendEmail(notifyingBooking);
                    setNotifyingBooking(null);
                  }}
                  className="flex flex-col items-center gap-2 p-4 bg-blue-50 rounded-2xl border border-blue-100 hover:bg-blue-100 transition-all font-bold text-blue-700"
                >
                  <Mail className="h-6 w-6" />
                  Email
                </button>
              </div>
              
              <button
                onClick={() => setNotifyingBooking(null)}
                className="mt-6 text-slate-400 text-sm font-bold hover:text-slate-600 underline"
              >
                Skip for now
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Booking Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold">New Admin Booking</h3>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-100 rounded-full">
                  <X />
                </button>
              </div>
              
              <form onSubmit={handleAddBooking} className="space-y-6">
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-slate-400 px-1">Patient Name</label>
                        <input
                            required
                            className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="Full Name"
                            value={formData.userName}
                            onChange={e => setFormData({...formData, userName: e.target.value})}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-slate-400 px-1">Phone</label>
                        <input
                            required
                            className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="+1 (234) 567 890"
                            value={formData.userPhone}
                            onChange={e => setFormData({...formData, userPhone: e.target.value})}
                        />
                    </div>
                 </div>

                 <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-slate-400 px-1">Email</label>
                    <input
                        required
                        type="email"
                        className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="patient@email.com"
                        value={formData.userEmail}
                        onChange={e => setFormData({...formData, userEmail: e.target.value})}
                    />
                 </div>

                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-slate-400 px-1">Department</label>
                        <select
                           required
                           className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none"
                           value={formData.departmentId}
                           onChange={e => setFormData({...formData, departmentId: e.target.value})}
                        >
                            <option value="">Select Dept</option>
                            {DEPARTMENTS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-slate-400 px-1">Doctor</label>
                        <select
                           required
                           className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none"
                           value={formData.doctorId}
                           onChange={e => setFormData({...formData, doctorId: e.target.value})}
                        >
                            <option value="">Select Doctor</option>
                            {DOCTORS.filter(d => !formData.departmentId || d.departmentId === formData.departmentId).map(d => (
                                <option key={d.id} value={d.id}>{d.name}</option>
                            ))}
                        </select>
                    </div>
                 </div>

                 <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-slate-400 px-1">Date</label>
                    <input
                        required
                        type="date"
                        className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none"
                        value={formData.date}
                        onChange={e => setFormData({...formData, date: e.target.value})}
                    />
                 </div>

                 <button
                    disabled={formLoading}
                    className="w-full bg-primary text-white py-5 rounded-3xl font-bold text-lg hover:bg-primary-dark transition-all disabled:opacity-50"
                 >
                    {formLoading ? 'Creating...' : 'Create Confirmed Booking'}
                 </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
