import { Hospital, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, Youtube, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-medical-navy text-slate-400 pt-32 pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_20px_rgba(14,165,233,0.5)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-medical-navy">
                 <Hospital className="h-7 w-7" />
              </div>
              <span className="text-3xl font-bold text-white tracking-tighter">Shri Sanjivni</span>
            </Link>
            <p className="text-lg leading-relaxed mb-10 font-light max-w-sm">
              We are a global beacon of healthcare excellence, merging pioneering medical innovation with deeply human compassion.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white hover:bg-primary transition-all hover:-translate-y-1"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase text-[10px] tracking-[0.3em] mb-10">Quick Nav</h4>
            <ul className="space-y-6 text-sm font-medium">
              <li><Link to="/about" className="hover:text-primary transition-colors flex items-center gap-2 group">About Us <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link to="/departments" className="hover:text-primary transition-colors flex items-center gap-2 group">Specialties <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link to="/doctors" className="hover:text-primary transition-colors flex items-center gap-2 group">Our Experts <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link to="/book" className="text-primary font-bold hover:underline">Book Consultation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase text-[10px] tracking-[0.3em] mb-10">Departments</h4>
            <ul className="space-y-6 text-sm font-medium">
              <li><Link to="/departments" className="hover:text-white transition-colors">Cardiology Center</Link></li>
              <li><Link to="/departments" className="hover:text-white transition-colors">Neurology Hub</Link></li>
              <li><Link to="/departments" className="hover:text-white transition-colors">Emergency Wing</Link></li>
              <li><Link to="/departments" className="hover:text-white transition-colors">Pediatric Care</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase text-[10px] tracking-[0.3em] mb-10">Visit Us</h4>
            <ul className="space-y-8 text-sm">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                   <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Emergency Call</p>
                   <p className="text-white">+1 (234) 567-890</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Locate Hub</p>
                  <p className="text-white">123 Medical Plaza, <br/>Health City, H-990</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 italic">Designed with precision for healthcare excellence</p>
          <div className="flex gap-10 text-[10px] font-bold uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-white transition-colors">Privacy Charter</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            <a href="#" className="hover:text-white transition-colors">© 2024 Shri Sanjivni</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
