import React from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  BarChart3, 
  MessageSquare,
  Star,
  Users,
  FileText,
  CheckSquare,
  Calendar
} from 'lucide-react';
import { Button } from '../components/ui/Base';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Customer Management',
      description: 'Keep track of all your clients, their details, and interaction history in one secure place.',
      icon: <Users className="w-6 h-6 text-blue-600" />
    },
    {
      title: 'Invoice System',
      description: 'Create professional invoices in seconds, track payments, and send automatic reminders.',
      icon: <FileText className="w-6 h-6 text-teal-600" />
    },
    {
      title: 'Task Tracking',
      description: 'Never miss a deadline again. Manage your daily to-dos with priorities and tracking.',
      icon: <CheckSquare className="w-6 h-6 text-purple-600" />
    },
    {
      title: 'Appointment Booking',
      description: 'A built-in calendar to manage your meetings and appointments without the back-and-forth.',
      icon: <Calendar className="w-6 h-6 text-orange-600" />
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-blue-600 w-6 h-6" />
            <span className="font-bold text-xl tracking-tight">BizFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-blue-600 transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Login</Link>
            <Button size="sm" onClick={() => navigate('/signup')}>Start Free</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-20 px-4 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] md:text-xs font-semibold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Trusted by 2,000+ small businesses
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-6 font-sans">
              Run Your Business <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Without the Stress</span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              The all-in-one platform to manage your customers, invoices, tasks, and appointments. Built for freelancers and modern small businesses.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Button size="lg" className="h-12 md:h-14 px-8 w-full sm:w-auto" onClick={() => navigate('/signup')}>
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="h-12 md:h-14 px-8 w-full sm:w-auto" onClick={() => navigate('/dashboard')}>
                View Demo
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative px-4 sm:px-0"
          >
            <div className="relative z-10 rounded-2xl md:rounded-3xl border border-slate-200 shadow-2xl overflow-hidden shadow-blue-500/10">
              <img 
                src="https://picsum.photos/seed/bizflow-dash/1200/800" 
                alt="Dashboard Preview" 
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
            </div>
            
            {/* Floating Element 1 - Hidden on small mobile */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-4 md:-top-12 md:-right-8 z-20 glass p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl hidden sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] md:text-xs font-semibold text-slate-900">Task Completed</p>
                  <p className="text-[8px] md:text-[10px] text-slate-500">Invoice #4202 sent</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Stop juggling spreadsheets and manual lists. BizFlow puts all your mission-critical data in one beautiful, scannable place.
          </p>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all"
            >
              <div className="mb-6">{f.icon}</div>
              <h3 className="text-lg font-bold mb-3">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-slate-600">Choose the plan that fits your growth ambitions.</p>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="p-10 rounded-3xl border border-slate-200 bg-white shadow-sm">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Starter</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-slate-500">/mo</span>
            </div>
            <p className="text-slate-600 mb-8">Perfect for freelancers just starting out.</p>
            <ul className="space-y-4 mb-8">
              {['5 Customers', '5 Invoices/mo', 'Basic Task Tracking', 'Standard Support'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full">Start for Free</Button>
          </div>
          <div className="p-10 rounded-3xl border-2 border-blue-600 bg-white shadow-xl relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Most Popular</div>
            <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">Pro Plan</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold">$29</span>
              <span className="text-slate-500">/mo</span>
            </div>
            <p className="text-slate-600 mb-8">Everything you need to scale your business.</p>
            <ul className="space-y-4 mb-8">
              {['Unlimited Customers', 'Unlimited Invoices', 'Advanced Analytics', 'Priority Support'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
            <Button className="w-full">Get Started Now</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-12 px-4 border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-blue-600 w-6 h-6" />
            <span className="font-bold text-xl tracking-tight">BizFlow</span>
          </div>
          <p className="text-sm text-slate-500">© 2024 BizFlow. Built for winners.</p>
          <div className="flex gap-6 text-slate-400">
            <Link to="#" className="hover:text-blue-600 transition-colors">Privacy</Link>
            <Link to="#" className="hover:text-blue-600 transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
