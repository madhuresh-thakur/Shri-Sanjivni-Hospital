import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Shield, Clock, Heart, Users, Activity, Play, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DEPARTMENTS } from '@/src/data';
import * as Icons from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/src/lib/utils';

const GALLERY_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200', title: 'Modern Facilities' },
  { url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200', title: 'Advanced Lab' },
  { url: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=1200', title: 'Patient Care' },
  { url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200', title: 'Specialists' },
  { url: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=1200', title: 'Emergency Care' },
  { url: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=1200', title: 'Diagnostic Center' },
];

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="pt-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center mb-12 hero-gradient">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full"
          >
            <img
              src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=2000"
              alt="Healthcare Excellence"
              className="w-full h-full object-cover brightness-[0.8] saturate-[1.1]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-medical-navy via-medical-navy/60 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl"
            >
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-xs font-bold uppercase tracking-widest mb-8 border border-white/10"
              >
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Next-Gen Healthcare Solutions
              </motion.div>
              
              <h1 className="text-6xl md:text-8xl font-bold text-white leading-[0.95] mb-8 tracking-tighter">
                Redefining <span className="text-accent underline decoration-medical-teal underline-offset-8">Care & Hope.</span>
              </h1>
              
              <p className="text-xl text-white/70 mb-12 leading-relaxed max-w-lg font-light">
                At Shri Sanjivni, we combine world-class medical expertise with deep compassion to deliver healthcare that's truly human-centric.
              </p>
              
              <div className="flex flex-wrap gap-6 items-center">
                <Link
                  to="/book"
                  className="group bg-primary text-white px-10 py-5 rounded-full font-bold flex items-center gap-3 hover:bg-medical-teal transition-all shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95"
                >
                  Book Your Visit <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="flex items-center gap-4 text-white group">
                  <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-medical-navy transition-all">
                    <Play className="h-5 w-5 fill-current ml-1" />
                  </div>
                  <span className="font-bold tracking-tight">Our Story</span>
                </button>
              </div>

              {/* Welcoming Doctor Accent */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mt-16 p-6 glass-card rounded-[2.5rem] border border-white/10 flex items-center gap-6 max-w-md hover:border-accent/30 transition-colors cursor-default group"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl scale-75 group-hover:scale-110 transition-transform" />
                  <img 
                    src="/welcoming_doctor_namaste.png" 
                    alt="Dr. Sanjivni Welcome" 
                    className="w-20 h-20 rounded-2xl object-cover relative z-10 border-2 border-white/20"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200";
                    }}
                  />
                  <div className="absolute -bottom-2 -right-2 bg-accent text-medical-navy p-1.5 rounded-lg shadow-lg z-20">
                     <Heart className="h-4 w-4 fill-current" />
                  </div>
                </div>
                <div>
                   <p className="text-accent font-black text-[10px] uppercase tracking-[0.4em] mb-1">Chief Surgeon's Welcome</p>
                   <p className="text-white text-3xl font-black tracking-tighter mb-1 select-none">"Radhe Radhe"</p>
                   <p className="text-white/40 text-xs font-medium leading-snug tracking-wide">May your path to healing be filled with divine peace.</p>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="hidden lg:block relative"
            >
              <div className="absolute -inset-4 bg-accent/20 rounded-[4rem] blur-3xl animate-pulse" />
              <div className="glass-card rounded-[3.5rem] p-10 relative overflow-hidden">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <Activity className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-slate-800 font-bold text-xl">Real-time Diagnostics</p>
                    <p className="text-slate-400 text-sm">Powered by AI Technology</p>
                  </div>
                </div>
                <div className="space-y-6">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.random() * 60 + 30}%` }}
                        transition={{ duration: 1.5, delay: 1 + i * 0.2 }}
                        className="h-full bg-primary" 
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-between items-end">
                   <div className="text-4xl font-black text-slate-800">99.8%</div>
                   <div className="text-slate-400 text-xs font-bold uppercase tracking-widest text-right">Accuracy Rate <br/>In Lab Testing</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features - Value Propositions */}
      <section className="section-padding overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-12"
          >
            {[
              { icon: Shield, title: 'Total Safety', text: 'Rigorous protocols for your complete peace of mind.', color: 'text-blue-500' },
              { icon: Clock, title: '24/7 Response', text: 'Round-the-clock emergency and trauma support.', color: 'text-teal-500' },
              { icon: Heart, title: 'Human Touch', text: 'Evidence-based care delivered with genuine empathy.', color: 'text-rose-500' },
              { icon: Users, title: 'Elite Guild', text: 'Network of board-certified medical pioneers.', color: 'text-amber-500' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group relative"
              >
                <div className={cn("w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:shadow-xl transition-all duration-500", feature.color)}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed font-light">{feature.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Departments Grid - High Polish */}
      <section className="section-padding bg-slate-50/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-xl"
            >
              <span className="text-primary font-black uppercase text-xs tracking-[0.3em] mb-4 block">Medical Hub</span>
              <h2 className="text-5xl font-bold tracking-tighter leading-none">Pioneering in Every <span className="text-slate-400">Field.</span></h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link to="/departments" className="group flex items-center gap-4 bg-white px-8 py-4 rounded-2xl border border-slate-100 font-bold hover:shadow-xl transition-all">
                Explore All Departments <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors"><ChevronRight className="h-5 w-5" /></div>
              </Link>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {DEPARTMENTS.slice(0, 4).map((dept, i) => {
               const IconComponent = (Icons as any)[dept.icon] || Icons.Hospital;
               return (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="bg-white p-10 rounded-[3rem] shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 group"
                >
                  <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-8 group-hover:bg-primary transition-colors duration-500">
                    <IconComponent className="h-9 w-9 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight">{dept.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-8 font-light">{dept.description}</p>
                  <Link 
                    to={`/doctors?department=${dept.id}`}
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary group-hover:translate-x-2 transition-transform"
                  >
                    Find Specialist <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
             <span className="text-primary font-black uppercase text-xs tracking-[0.3em] mb-4 block">Visual Tour</span>
             <h2 className="text-5xl font-bold tracking-tighter">Our Medical <span className="text-slate-400">Sanctuary.</span></h2>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
            {GALLERY_IMAGES.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedImage(img.url)}
                className="relative group cursor-pointer overflow-hidden rounded-[2.5rem] bg-slate-100"
              >
                <img 
                  src={img.url} 
                  alt={img.title}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.9] group-hover:brightness-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-medical-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-10">
                  <div>
                    <p className="text-white font-bold text-xl">{img.title}</p>
                    <p className="text-white/60 text-sm">Experience excellence</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Reimagined */}
      <section className="py-32 bg-medical-navy relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 text-center">
            {[
              { label: 'Successful Procedures', value: '45,000+' },
              { label: 'Patient Satisfaction', value: '98%' },
              { label: 'Global Specialists', value: '250+' },
              { label: 'Years Of Legacy', value: '40+' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
              >
                <div className="text-6xl font-black text-white mb-4 italic tracking-tighter">{stat.value}</div>
                <div className="text-primary font-bold uppercase text-[10px] tracking-[0.4em]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials or Trust Section */}
      <section className="section-padding bg-slate-50 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <Activity className="h-12 w-12 text-primary/20 mx-auto mb-10" />
           <h3 className="text-4xl font-bold mb-10 leading-tight tracking-tight">"The level of precision and care I received at Shri Sanjivni was unparalleled. They didn't just treat me; they healed my spirit."</h3>
           <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-slate-200" />
              <div className="text-left">
                 <p className="font-bold text-slate-900">Dr. Sarah Jenkins</p>
                 <p className="text-slate-400 text-sm">Medical Researcher & Chronic Patient</p>
              </div>
           </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 max-w-5xl w-full"
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-16 right-0 p-3 bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-full transition-all"
              >
                <X />
              </button>
              <img 
                src={selectedImage} 
                className="w-full rounded-[2rem] shadow-2xl" 
                alt="Enlarged gallery view"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
