import { motion } from 'motion/react';
import { DEPARTMENTS } from '@/src/data';
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';

export default function Departments() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-32 bg-medical-navy text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-black uppercase text-xs tracking-[0.4em] mb-6 block">Our Expertise</span>
            <h1 className="text-6xl md:text-7xl font-bold mb-8 tracking-tighter">Specialized <span className="text-primary tracking-normal italic">Medical Care.</span></h1>
            <p className="text-xl text-white/60 leading-relaxed font-light">
              We provide comprehensive care across a spectrum of medical disciplines, ensuring that every patient receives targeted, expert treatment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding bg-white relative">
         {/* Decorative elements */}
         <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
         
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {DEPARTMENTS.map((dept, i) => {
              const IconComponent = (Icons as any)[dept.icon] || Icons.Hospital;
              return (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="bg-slate-50 p-12 rounded-[3.5rem] border border-slate-100 h-full flex flex-col transition-all duration-500 hover:bg-white hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] hover:border-primary/10">
                    <div className="flex items-start justify-between mb-10">
                      <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-sm group-hover:bg-primary transition-colors duration-500">
                        <IconComponent className="h-10 w-10 text-primary group-hover:text-white transition-colors duration-500" />
                      </div>
                      <div className="text-slate-100 font-black text-6xl group-hover:text-primary/5 transition-colors">
                        0{i + 1}
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-6 tracking-tight text-slate-900">{dept.name}</h3>
                    <p className="text-slate-500 mb-10 leading-relaxed font-light flex-grow">
                      {dept.description}
                    </p>
                    
                    <Link 
                      to={`/doctors?department=${dept.id}`}
                      className="group/btn inline-flex items-center gap-3 text-sm font-black uppercase tracking-widest text-primary"
                    >
                      Browse Specialists 
                      <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-white transition-all">
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Reimagined */}
      <section className="pb-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-medical-navy rounded-[4rem] p-16 md:p-24 text-center text-white relative overflow-hidden"
          >
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5 pointer-events-none">
                <Icons.Activity className="w-full h-full text-white" />
            </div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tighter">Your Health is Our Leading <span className="text-primary italic">Priority.</span></h2>
              <p className="text-lg text-white/50 mb-12 font-light">
                Whether it's a routine check-up or complex surgery, our multidisciplinary team is here to guide you every step of the way.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  to="/book"
                  className="bg-primary text-white px-10 py-5 rounded-full font-bold hover:bg-medical-teal transition-all inline-flex items-center gap-3 shadow-2xl shadow-primary/20"
                >
                  Start Your Consultation <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/doctors"
                  className="bg-white/10 backdrop-blur-md text-white border border-white/10 px-10 py-5 rounded-full font-bold hover:bg-white hover:text-medical-navy transition-all"
                >
                  View All Doctors
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
