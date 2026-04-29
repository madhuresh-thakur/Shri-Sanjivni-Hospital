import { motion } from 'motion/react';
import { CheckCircle2, History, Target, Award, Heart, Shield, Activity } from 'lucide-react';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="pt-20 overflow-x-hidden">
      {/* Hero Header */}
      <section className="py-32 bg-medical-navy relative">
        <div className="absolute inset-0 opacity-10">
           <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary rounded-full blur-[100px]" />
           <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent rounded-full blur-[100px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="text-primary font-black uppercase text-xs tracking-[0.4em] mb-6 block">Our Legacy</span>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-tight">
              Pioneering <span className="text-primary italic">Health</span><br/>for Generations.
            </h1>
            <p className="text-xl text-white/50 leading-relaxed max-w-3xl mx-auto font-light">
              Since our inception, Shri Sanjivni has been at the forefront of medical excellence, merging cutting-edge technology with the timeless art of healing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story with parallax style images */}
      <section className="section-padding bg-white relative">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
               className="relative"
            >
              <div className="relative z-10 overflow-hidden rounded-[3rem] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200"
                  alt="Our Heritage"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 hidden md:block">
                <p className="text-6xl font-black text-primary tracking-tighter mb-2">25+</p>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Years of Global <br/>Healthcare Leadership</p>
              </div>
            </motion.div>
            
            <motion.div
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
            >
              <div className="flex items-center gap-4 text-primary font-black text-xs uppercase tracking-[0.3em] mb-8">
                <div className="w-10 h-[1px] bg-primary" /> Our Genesis
              </div>
              <h2 className="text-5xl font-bold mb-8 tracking-tighter text-slate-900">Built on a foundation of <span className="text-slate-400 italic font-light tracking-normal">visionary care.</span></h2>
              <p className="text-slate-500 mb-10 leading-relaxed font-light text-lg">
                What began as a passionate dream in 1999 has evolved into a world-renowned multi-specialty institution. We've spent decades redefining the patient experience, ensuring that every soul who walks through our doors feels heard, valued, and empowered.
              </p>
              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { title: 'Global Benchmarks', icon: Shield },
                  { title: 'Robotic Precision', icon: Activity },
                  { title: 'Compassionate Heart', icon: Heart },
                  { title: 'Legacy of Trust', icon: Award },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                       <item.icon size={20} />
                    </div>
                    <span className="text-slate-700 font-bold tracking-tight">{item.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values - High Polish */}
      <section className="section-padding bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid lg:grid-cols-3 gap-12"
          >
             <motion.div variants={itemVariants} className="lg:col-span-1">
                <span className="text-primary font-black uppercase text-xs tracking-[0.4em] mb-6 block">The Compass</span>
                <h3 className="text-5xl font-bold tracking-tighter mb-8 italic">Guiding Principles.</h3>
                <p className="text-slate-400 font-light leading-relaxed">Everything we do is anchored in these non-negotiable core values that define our culture.</p>
             </motion.div>

            <motion.div variants={itemVariants} className="bg-white p-12 rounded-[3.5rem] border border-white shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded-3xl mb-10">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-6 tracking-tight">Our Mission</h3>
              <p className="text-slate-500 leading-relaxed font-light">
                To serve humanity through scientific precision, unyielding integrity, and a culture that treats every patient like family.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white p-12 rounded-[3.5rem] border border-white shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
              <div className="w-16 h-16 bg-accent/10 flex items-center justify-center rounded-3xl mb-10">
                <Award className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-3xl font-bold mb-6 tracking-tight">Our Vision</h3>
              <p className="text-slate-500 leading-relaxed font-light">
                To lead the global healthcare landscape as a multi-disciplinary hub of innovation and life-changing breakthroughs.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Recognition Bar */}
      <section className="py-20 bg-white border-y border-slate-50">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 mb-12">Accredited & Certified By</p>
            <div className="flex flex-wrap justify-center items-center gap-16 lg:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
               {['JCI GOLD', 'NABH ELITE', 'ISO 9001:2022', 'QAI MEDICAL'].map((cert) => (
                  <div key={cert} className="text-2xl font-black tracking-tighter text-slate-800">{cert}</div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}
