import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import Logo from '../../../Components/Logo/Logo';
import { Github, Linkedin, Mail, ShieldCheck, Terminal, Globe, ChevronRight, Send, ArrowUp } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [isVisible, setIsVisible] = useState(false);

    // LOGIC: Show button only when scrolling near the bottom/footer
    useEffect(() => {
        const toggleVisibility = () => {
            // Shows when user scrolls more than 400px
            if (window.pageYOffset > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const navLinks = [
        { name: 'Home_Terminal', path: '/' },
        { name: 'Search_Donors', path: '/search' },
        { name: 'Live_Inventory', path: '/inventory' },
        { name: 'Request_Sync', path: '/request' },
        { name: 'Emergency_Map', path: '/map' },
    ];

    const protocolLinks = [
        { name: 'Privacy_Policy', path: '/privacy' },
        { name: 'Terms_of_Service', path: '/terms' },
        { name: 'API_Documentation', path: '/api' },
        { name: 'Security_Log', path: '/security' },
    ];

    return (
        <footer className="bg-neutral-950 text-white font-mono relative border-t border-white/10 pt-20 pb-10">
            {/* --- BACK TO TOP TRIGGER --- */}
            <div 
                className={`fixed bottom-10 right-10 z-50 transition-all duration-500 transform ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                }`}
            >
                <button
                    onClick={scrollToTop}
                    className="group flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] font-black text-secondary opacity-0 group-hover:opacity-100 transition-opacity tracking-[0.2em] mb-1">
                        TOP_SCROLL
                    </span>
                    <div className="w-12 h-12 bg-neutral-900 border border-white/10 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all shadow-2xl">
                        <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
                    </div>
                </button>
            </div>

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:30px_30px]"></div>

            <div className="container mx-auto px-4 lg:px-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
                    
                    {/* COLUMN 1: BRAND & NEWSLETTER (4 Units) */}
                    <div className="lg:col-span-4 space-y-8">
                        <Logo />
                        <p className="text-sm md:text-base text-neutral-400 uppercase tracking-wider leading-relaxed max-w-md">
                            LifeFlow Industrial Node: Optimizing blood supply chain logistics via real-time donor-hospital synchronization.
                        </p>
                        
                        {/* NEWSLETTER DISPATCH */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-secondary">_Newsletter_Dispatch</h4>
                            <form className="flex max-w-md border border-white/10 group focus-within:border-secondary transition-all">
                                <input 
                                    type="email" 
                                    placeholder="SYNC_EMAIL_ADDRESS" 
                                    className="bg-white/5 w-full px-4 py-3 text-sm focus:outline-none placeholder:text-neutral-600"
                                />
                                <button className="bg-secondary px-6 hover:bg-red-700 transition-colors flex items-center justify-center">
                                    <Send size={18} />
                                </button>
                            </form>
                            <p className="text-[10px] text-neutral-600 uppercase font-bold tracking-tighter">
                                Frequency: Weekly_Sync // Protocol: Encrypted
                            </p>
                        </div>
                    </div>

                    {/* COLUMN 2: NAVIGATION (2 Units) */}
                    <div className="lg:col-span-2 space-y-8">
                        <h4 className="text-sm font-black uppercase tracking-[0.3em] text-secondary border-b border-white/5 pb-2">_Main_Routes</h4>
                        <ul className="space-y-4">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path} className="text-sm text-neutral-300 hover:text-white flex items-center gap-3 group transition-all">
                                        <ChevronRight size={14} className="text-secondary opacity-50 group-hover:opacity-100 transition-all" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COLUMN 3: PROTOCOLS (2 Units) */}
                    <div className="lg:col-span-2 space-y-8">
                        <h4 className="text-sm font-black uppercase tracking-[0.3em] text-secondary border-b border-white/5 pb-2">_Protocols</h4>
                        <ul className="space-y-4">
                            {protocolLinks.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path} className="text-sm text-neutral-300 hover:text-white flex items-center gap-3 group transition-all">
                                        <ChevronRight size={14} className="text-neutral-600 group-hover:text-white transition-all" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COLUMN 4: DEVELOPER PROFILE (4 Units) */}
                    <div className="lg:col-span-4 space-y-8">
                        <h4 className="text-sm font-black uppercase tracking-[0.3em] text-secondary border-b border-white/5 pb-2">_Developer_Access</h4>
                        <div className="p-8 bg-white/2 border border-white/5 relative overflow-hidden">
                            <div className="flex items-center gap-5 mb-6">
                                <div className="w-14 h-14 bg-secondary/10 flex items-center justify-center border border-secondary/20">
                                    <Terminal size={28} className="text-secondary" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black uppercase italic text-white tracking-tighter">Karishma Fariha</h3>
                                    <p className="text-xs text-secondary font-bold uppercase tracking-[0.2em]">MERN_Stack_Architect</p>
                                </div>
                            </div>
                            
                            {/* SOCIAL NODE LINKS */}
                            <div className="flex flex-wrap gap-6 pt-6 border-t border-white/5">
                                <a href="https://github.com/karishma-fariha" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group">
                                    <Github size={20} />
                                    <span className="text-[10px] font-bold group-hover:underline">GITHUB</span>
                                </a>
                                <a href="https://www.linkedin.com/in/karishma-fariha" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-neutral-400 hover:text-blue-500 transition-colors group">
                                    <Linkedin size={20} />
                                    <span className="text-[10px] font-bold group-hover:underline">LINKEDIN</span>
                                </a>
                                <a href="mailto:karishmafarihakathi10@gmail.com" className="flex items-center gap-2 text-neutral-400 hover:text-secondary transition-colors group">
                                    <Mail size={20} />
                                    <span className="text-[10px] font-bold group-hover:underline">EMAIL</span>
                                </a>
                            </div>

                            <div className="mt-6 flex items-center justify-between text-[11px] text-neutral-600 font-bold uppercase">
                                <span className="flex items-center gap-2"><Globe size={14}/> Dhaka_Node</span>
                                <span className="italic">Active_Dev_Status</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FINAL TERMINAL STRIP */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-10">
                        <span className="text-xs text-neutral-600 font-bold uppercase tracking-[0.2em]">
                            © {currentYear} LifeFlow_Terminal
                        </span>
                        <div className="hidden md:flex gap-6 text-xs text-neutral-800 uppercase italic font-bold">
                            <span>Lat: 23.8103° N</span>
                            <span>Long: 90.4125° E</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                            <span className="text-xs text-neutral-500 uppercase font-black">Mainframe_Ready</span>
                        </div>
                        <span className="text-xs text-neutral-700 font-bold tracking-tighter">VER: LF-2026-STABLE</span>
                    </div>
                </div>
            </div>

            {/* Bottom Glow Accent */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-secondary/40 to-transparent"></div>
        </footer>
    );
};

export default Footer;