import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DOCTORS, DEPARTMENTS } from '@/src/data';
import { Search, Filter, Mail, GraduationCap, Briefcase, Plus, MessageSquare } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export default function Doctors() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDept = searchParams.get('department') || 'all';
  
  const [search, setSearch] = React.useState('');
  const [selectedDept, setSelectedDept] = React.useState(initialDept);

  const filteredDoctors = DOCTORS.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase()) || 
                         doc.specialty.toLowerCase().includes(search.toLowerCase());
    const matchesDept = selectedDept === 'all' || doc.departmentId === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="pt-20 pb-24 bg-slate-50/30">
      {/* Header */}
      <section className="bg-white py-24 border-b border-slate-100 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
             <span className="text-primary font-black uppercase text-xs tracking-[0.4em] mb-4 block">The Experts</span>
            <h1 className="text-6xl md:text-7xl font-bold mb-8 tracking-tighter">Meet Our <span className="text-primary italic">Pioneers.</span></h1>
            <p className="text-xl text-slate-500 mb-12 font-light leading-relaxed max-w-2xl">
              Our specialists are more than doctors—they are leaders in their fields, committed to pushing the boundaries of medical science.
            </p>
            
            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-6 items-center w-full">
              <div className="w-full lg:flex-1 relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Search by name, expertise or specialty..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-16 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-primary/10 focus:bg-white transition-all font-medium"
                />
              </div>
              <div className="flex gap-4 w-full lg:w-auto">
                <div className="flex-1 lg:w-64 relative bg-slate-50 border border-slate-100 rounded-[2rem] px-6 py-5 flex items-center gap-3 focus-within:ring-4 focus-within:ring-primary/10 hover:border-slate-200 transition-all">
                  <Filter className="h-5 w-5 text-slate-400" />
                  <select
                    value={selectedDept}
                    onChange={(e) => {
                      setSelectedDept(e.target.value);
                      setSearchParams(e.target.value === 'all' ? {} : { department: e.target.value });
                    }}
                    className="bg-transparent font-bold text-slate-700 outline-none w-full appearance-none cursor-pointer"
                  >
                    <option value="all">All Specialties</option>
                    {DEPARTMENTS.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            <AnimatePresence mode="popLayout">
              {filteredDoctors.map((doc, i) => (
                <motion.div
                  key={doc.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                  className="group"
                >
                  <div className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-700 h-full flex flex-col">
                    <div className="aspect-[4/5] relative overflow-hidden bg-slate-100">
                      <img 
                        src={doc.image} 
                        alt={doc.name} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 saturate-[0.9] group-hover:saturate-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-medical-navy/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
                      
                      <div className="absolute top-6 right-6">
                         <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                            <Plus className="h-5 w-5" />
                         </div>
                      </div>

                      <div className="absolute bottom-10 left-10 right-10">
                        <div className="flex items-center gap-3 mb-3">
                           <div className="w-10 h-[1px] bg-accent" />
                           <p className="text-accent font-black uppercase text-[10px] tracking-[0.3em]">{doc.specialty}</p>
                        </div>
                        <p className="text-white font-bold text-4xl tracking-tighter leading-none mb-2">{doc.name}</p>
                      </div>
                    </div>
                    
                    <div className="p-10 flex-grow flex flex-col">
                      <div className="space-y-6 mb-10 flex-grow">
                        <div className="flex gap-4 group/item">
                          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover/item:bg-primary/5 group-hover/item:text-primary transition-all">
                             <GraduationCap className="h-6 w-6" />
                          </div>
                          <div>
                             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Education</p>
                             <p className="text-sm font-bold text-slate-700 leading-snug">{doc.education}</p>
                          </div>
                        </div>

                        <div className="flex gap-4 group/item">
                          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover/item:bg-medical-teal/5 group-hover/item:text-medical-teal transition-all">
                             <Briefcase className="h-6 w-6" />
                          </div>
                          <div>
                             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Experience</p>
                             <p className="text-sm font-bold text-slate-700">{doc.experience} Clinical Practice</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <Link 
                          to="/book"
                          className="bg-medical-navy text-white py-5 rounded-[1.5rem] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary transition-all shadow-xl shadow-medical-navy/10"
                        >
                          Book Appt
                        </Link>
                        <button className="bg-slate-50 text-slate-400 py-5 rounded-[1.5rem] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-100 hover:text-slate-600 transition-all">
                          <Mail className="h-4 w-4" /> Message
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {filteredDoctors.length === 0 && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="py-32 text-center"
            >
              <div className="inline-flex w-24 h-24 bg-slate-100 items-center justify-center rounded-[2rem] mb-6">
                <Search className="h-10 w-10 text-slate-300" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 tracking-tight">No experts match your search</h3>
              <p className="text-slate-400 max-w-sm mx-auto mt-4 font-light">Try exploring another specialty or adjusting your search keywords.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Specialist CTA */}
      <section className="section-padding">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary/5 rounded-[4rem] p-20 flex flex-col lg:flex-row items-center justify-between gap-12 border border-primary/10">
               <div className="max-w-xl">
                  <h3 className="text-4xl font-bold tracking-tight mb-4">Want to join our global network of experts?</h3>
                  <p className="text-slate-500 font-light">We are always looking for exceptional medical professionals to join our mission of redefining healthcare.</p>
               </div>
               <button className="whitespace-nowrap bg-white text-medical-navy px-10 py-5 rounded-full font-bold shadow-2xl shadow-primary/10 hover:scale-105 transition-all">
                  Apply for Residency
               </button>
            </div>
         </div>
      </section>
    </div>
  );
}
