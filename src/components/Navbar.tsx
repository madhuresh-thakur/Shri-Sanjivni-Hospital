import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Hospital, Menu, X, LogOut, User, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useAuth } from '../AuthContext';
import { auth } from '../firebase';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Departments', path: '/departments' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'My Bookings', path: '/my-bookings' },
  ];

  const isAdmin = user?.email === 'admin123@gmail.com' || user?.email === 'thakurmadhuresh1808@gmail.com';

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      scrolled 
        ? "bg-white/80 backdrop-blur-xl border-b border-slate-100 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)]" 
        : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
              <Hospital className="h-6 w-6" />
            </div>
            <span className={cn(
              "text-2xl font-bold tracking-tighter transition-colors",
              scrolled ? "text-medical-navy" : "text-white md:text-medical-navy"
            )}>
              Shri Sanjivni
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-xs font-bold uppercase tracking-widest transition-all hover:text-primary relative group',
                  location.pathname === link.path 
                    ? 'text-primary' 
                    : scrolled ? 'text-slate-500' : 'text-slate-400'
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-300",
                  location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            ))}
            
            {isAdmin && (
              <Link
                to="/admin"
                className="text-xs font-black uppercase tracking-widest text-primary px-4 py-2 bg-primary/5 rounded-xl border border-primary/10 hover:bg-primary hover:text-white transition-all shadow-sm"
              >
                Admin Panel
              </Link>
            )}
            
            <div className="h-6 w-[1px] bg-slate-200" />

            {user ? (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                     <User className="h-4 w-4 text-slate-500" />
                  </div>
                  <span className={cn(
                    "text-xs font-bold",
                    scrolled ? "text-slate-700" : "text-slate-500"
                  )}>{user.displayName || 'User'}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
                <Link
                  to="/book"
                  className="bg-medical-navy text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:bg-primary shadow-xl shadow-medical-navy/10 active:scale-95"
                >
                  Appointment
                </Link>
              </div>
            ) : (
              <Link
                to="/auth"
                className={cn(
                  "px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all active:scale-95",
                  scrolled 
                    ? "bg-medical-navy text-white shadow-xl shadow-medical-navy/10 hover:bg-primary"
                    : "bg-white text-medical-navy hover:shadow-xl"
                )}
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "md:hidden p-3 rounded-2xl transition-all",
              scrolled ? "bg-slate-50 text-slate-900" : "bg-white/10 text-white backdrop-blur-md"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="fixed inset-0 z-50 md:hidden bg-medical-navy px-8 py-24"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 text-white/50 hover:text-white"
            >
              <X size={32} />
            </button>
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'text-4xl font-bold tracking-tighter transition-all',
                    location.pathname === link.path ? 'text-accent' : 'text-white/60'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px w-full bg-white/10 my-4" />
              {user ? (
                <>
                  <div className="flex items-center gap-4 text-white">
                    <div className="w-12 h-12 rounded-full bg-white/10" />
                    <div>
                       <p className="font-bold text-xl">{user.displayName}</p>
                       <button onClick={handleLogout} className="text-red-400 text-sm font-bold uppercase tracking-widest">Logout from system</button>
                    </div>
                  </div>
                  <Link
                    to="/book"
                    onClick={() => setIsOpen(false)}
                    className="bg-primary text-white text-center py-6 rounded-3xl text-xl font-bold shadow-2xl shadow-primary/20"
                  >
                    Quick Appointment
                  </Link>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setIsOpen(false)}
                  className="bg-white text-medical-navy text-center py-6 rounded-3xl text-xl font-bold"
                >
                  Join the Grid
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
