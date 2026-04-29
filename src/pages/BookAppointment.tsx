import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, User, Phone, CheckCircle, FileText, Shield } from 'lucide-react';
import { DEPARTMENTS, DOCTORS } from '@/src/data';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firebaseUtils';

export default function BookAppointment() {
  const { user } = useAuth();
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    department: '',
    doctor: '',
    date: '',
    msg: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    const path = 'bookings';
    try {
      await addDoc(collection(db, path), {
        userId: user.uid,
        userName: formData.name,
        userEmail: formData.email,
        userPhone: formData.phone,
        departmentId: formData.department,
        doctorId: formData.doctor,
        date: formData.date,
        message: formData.msg,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setIsSubmitted(true);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="pt-40 pb-24 px-4 min-h-screen hero-gradient flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl text-center max-w-2xl border border-slate-100"
        >
          <div className="w-24 h-24 bg-green-50 text-green-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-lg shadow-green-500/20">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-5xl font-bold mb-6 tracking-tighter">Consultation Requested.</h2>
          <p className="text-slate-500 text-lg mb-12 font-light leading-relaxed">
            Thank you, <strong>{formData.name}</strong>. Our medical planning team has received your request and will provide you with the next available slot within a few hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/my-bookings"
              className="bg-medical-navy text-white px-10 py-5 rounded-full font-bold hover:bg-primary transition-all shadow-xl shadow-medical-navy/20"
            >
              Manage Bookings
            </Link>
            <Link
              to="/"
              className="bg-slate-100 text-slate-600 px-10 py-5 rounded-full font-bold hover:bg-slate-200 transition-all"
            >
              Back Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-slate-50/30">
      {/* Header Banner */}
      <section className="bg-medical-navy py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-primary font-black uppercase text-xs tracking-[0.4em] mb-4 block">Medical Access</span>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-none">Book Your <span className="text-primary italic">Expert.</span></h1>
            <p className="text-xl text-white/50 font-light leading-relaxed max-w-xl">
              From routine care to specialized procedures, find the world's leading specialists right here.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20 pb-32">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form Side */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[3.5rem] p-10 md:p-16 shadow-[0_30px_70px_rgba(0,0,0,0.05)] border border-white"
            >
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-2">Patient's Full Name</label>
                    <div className="relative group">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                      <input
                        required
                        type="text"
                        placeholder="e.g. Johnathan Smith"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full pl-16 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-primary/10 focus:bg-white transition-all font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-2">Contact Hotline</label>
                    <div className="relative group">
                      <Phone className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                      <input
                        required
                        type="tel"
                        placeholder="+1 (555) 000 0000"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full pl-16 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-primary/10 focus:bg-white transition-all font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-2">Target Specialty</label>
                    <div className="relative">
                      <select
                        required
                        value={formData.department}
                        onChange={e => setFormData({...formData, department: e.target.value, doctor: ''})}
                        className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-primary/10 appearance-none font-bold text-slate-800 cursor-pointer"
                      >
                        <option value="">Select Specialty</option>
                        {DEPARTMENTS.map(d => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                         <Calendar size={20} />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-2">Preferred Consultant</label>
                    <div className="relative">
                      <select
                        required
                        disabled={!formData.department}
                        value={formData.doctor}
                        onChange={e => setFormData({...formData, doctor: e.target.value})}
                        className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-primary/10 appearance-none font-bold text-slate-800 cursor-pointer disabled:opacity-50"
                      >
                        <option value="">Select Specialist</option>
                        {DOCTORS.filter(d => !formData.department || d.departmentId === formData.department).map(d => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                         <User size={20} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-2">Preferred Timeline</label>
                    <div className="relative group">
                      <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                      <input
                        required
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.date}
                        onChange={e => setFormData({...formData, date: e.target.value})}
                        className="w-full pl-16 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-primary/10 focus:bg-white transition-all font-bold text-slate-800"
                      />
                    </div>
                  </div>
                  <div className="flex items-end pb-3">
                     <p className="text-[10px] text-slate-400 font-medium leading-tight">Timeline is used for preference; actual time will be confirmed by desk.</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-2">Medical Notes (Optional)</label>
                  <div className="relative group">
                    <FileText className="absolute left-6 top-6 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                    <textarea
                      placeholder="Briefly explain your heart rate, symptoms or previous history..."
                      rows={4}
                      value={formData.msg}
                      onChange={e => setFormData({...formData, msg: e.target.value})}
                      className="w-full pl-16 pr-8 py-6 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-primary/10 focus:bg-white transition-all font-medium resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white py-6 rounded-full font-black uppercase tracking-[0.3em] text-sm hover:bg-medical-teal transition-all shadow-2xl shadow-primary/30 disabled:opacity-50 flex items-center justify-center gap-3 active:scale-95"
                >
                  {loading ? 'Processing Protocol...' : 'Finalize Consultation'}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Right Info Cards */}
          <div className="space-y-8">
            <motion.div 
               initial={{ opacity: 0, x: 30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.4 }}
               className="bg-medical-navy p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
               <h3 className="text-2xl font-bold mb-8">Clinical Logistics</h3>
               <div className="space-y-8">
                  {[
                    { icon: Clock, title: 'Average Wait', value: '15 Mins' },
                    { icon: Shield, title: 'Sterilization', value: 'Level 5' },
                    { icon: User, title: 'Support', value: '24/7 Desk' },
                  ].map((log, i) => (
                    <div key={i} className="flex gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary">
                          <log.icon size={24} />
                       </div>
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">{log.title}</p>
                          <p className="text-lg font-bold">{log.value}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: 30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.5 }}
               className="bg-accent p-10 rounded-[3.5rem] text-medical-navy shadow-lg"
            >
               <h3 className="text-xl font-black uppercase tracking-widest mb-6">Pro Tip</h3>
               <p className="font-bold leading-relaxed mb-6">"Radhe Radhe! Your health is a reflection of your mental peace. Arrive early for a quick guided meditation session."</p>
               <div className="w-12 h-1 bg-medical-navy mb-6 opacity-20" />
               <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Shri Sanjivni Wellness Team</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
