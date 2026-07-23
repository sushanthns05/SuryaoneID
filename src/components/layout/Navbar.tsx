'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Menu, X, ChevronDown, Globe, Moon, Bell, LogOut, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const publicLinks = [
    { name: 'Home', href: '/' },
    { name: 'Verify Credential', href: '/verify' },
    { name: 'Security', href: '/security' },
    { name: 'Support', href: '/support' },
    { name: 'About', href: '/about' },
  ];

  const protectedLinks = [
    { name: 'My OneID', href: '/my-oneid' },
    { name: 'Digital Wallet', href: '/wallet' },
    { name: 'Document Vault', href: '/vault' },
    { name: 'Applications', href: '/applications' },
    { name: 'Verify Credential', href: '/verify' },
  ];

  const activeLinks = isAuthenticated ? protectedLinks : publicLinks;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-white/5 py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="p-2 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                <Shield className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-wider text-white">SURYA</span>
                <span className="text-xl font-light text-blue-400"> OneID</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex flex-1 justify-center">
            <div className="flex items-center space-x-8">
              {activeLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    className={`text-sm font-medium transition-colors ${isActive ? 'text-blue-400' : 'text-slate-300 hover:text-white'}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 border-r border-white/10 pr-4">
              <button className="p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/5"><Globe className="w-5 h-5" /></button>
              <button className="p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/5"><Moon className="w-5 h-5" /></button>
              {isAuthenticated && (
                <button className="p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/5 relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border border-[#0a0f24]"></span>
                </button>
              )}
            </div>
            
            {!isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link href="/sign-in" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Sign In</Link>
                <Link href="/create-oneid" className="text-sm font-medium px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all text-white">
                  Create OneID
                </Link>
              </div>
            ) : (
              <div className="relative" onMouseEnter={() => setShowProfile(true)} onMouseLeave={() => setShowProfile(false)}>
                <button className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
                <AnimatePresence>
                  {showProfile && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 w-64 pt-2"
                    >
                      <div className="glass-card border border-white/10 rounded-xl overflow-hidden shadow-2xl p-4">
                        <div className="mb-4 pb-4 border-b border-white/10">
                          <p className="font-semibold text-white">{user?.displayName || 'User'}</p>
                          <p className="text-xs text-slate-400 font-mono mt-1">{user?.oneId || 'Pending'}</p>
                        </div>
                        <Link href="/profile" className="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Profile Management</Link>
                        <Link href="/settings" className="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Account Settings</Link>
                        <Link href="/security-center" className="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors mb-2">Security Center</Link>
                        <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors flex items-center">
                          <LogOut className="w-4 h-4 mr-2" /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {activeLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white">
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-white/10 mt-4">
                {!isAuthenticated ? (
                  <div className="space-y-4">
                    <Link href="/sign-in" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white">Sign In</Link>
                    <Link href="/create-oneid" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-blue-400">Create OneID</Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Link href="/profile" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white">Profile Management</Link>
                    <Link href="/settings" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white">Account Settings</Link>
                    <button onClick={() => { logout(); setIsOpen(false); }} className="block w-full text-left px-3 py-2 text-base font-medium text-red-400">Sign Out</button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
