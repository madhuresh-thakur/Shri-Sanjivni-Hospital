import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { db } from '../firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { useAuth } from '../AuthContext';
import { handleFirestoreError, OperationType } from '../lib/firebaseUtils';
import { Calendar, Clock, User, Activity, CheckCircle2, Timer, XCircle } from 'lucide-react';
import { DEPARTMENTS, DOCTORS } from '@/src/data';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

interface Booking {
  id: string;
  departmentId: string;
  doctorId: string;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  userName: string;
  createdAt: any;
}

export default function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      
      const path = 'bookings';
      try {
        const q = query(
          collection(db, path),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const fetchedBookings = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Booking[];
        
        setBookings(fetchedBookings);
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, path);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'cancelled': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <Timer className="h-5 w-5 text-amber-500" />;
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-50 text-green-700 border-green-100';
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-100';
      default: return 'bg-amber-50 text-amber-700 border-amber-100';
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Your Appointments</h1>
            <p className="text-slate-500 mt-2">Manage and track your upcoming healthcare visits.</p>
          </div>
          <Link
            to="/book"
            className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary-dark transition-all"
          >
            New Appointment
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : bookings.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((booking, i) => {
              const dept = DEPARTMENTS.find(d => d.id === booking.departmentId);
              const doc = DOCTORS.find(d => d.id === booking.doctorId);
              
              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col"
                >
                  <div className="p-6 border-b border-slate-50 flex justify-between items-start">
                    <div className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border flex items-center gap-2",
                      getStatusStyles(booking.status)
                    )}>
                      {getStatusIcon(booking.status)}
                      {booking.status}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      ID: {booking.id.slice(0, 8)}
                    </div>
                  </div>
                  
                  <div className="p-8 space-y-6 flex-grow">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                        <Activity className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Department</p>
                        <p className="font-bold text-slate-900">{dept?.name || 'General'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                        <User className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Specialist</p>
                        <p className="font-bold text-slate-900">{doc?.name || 'Any Specialist'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                        <Calendar className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Date</p>
                        <p className="font-bold text-slate-900">{booking.date}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 italic text-sm text-slate-500">
                    Your appointment is currently {booking.status}.
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] p-20 text-center border border-slate-100">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Clock className="h-10 w-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold mb-3">No bookings found</h3>
            <p className="text-slate-500 mb-10 max-w-sm mx-auto">
              You haven't scheduled any appointments yet. Start your journey to better health today.
            </p>
            <Link
              to="/book"
              className="bg-primary text-white px-10 py-4 rounded-full font-bold hover:bg-primary-dark transition-all inline-block"
            >
              Book Your First Appointment
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
