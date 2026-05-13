import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Calendar, 
  CheckSquare, 
  Settings, 
  LogOut,
  TrendingUp
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

export const Sidebar: React.FC = () => {
  const { logout, user } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Customers', path: '/customers' },
    { icon: FileText, label: 'Invoices', path: '/invoices' },
    { icon: Calendar, label: 'Appointments', path: '/appointments' },
    { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="w-64 bg-slate-950 text-slate-400 h-screen sticky top-0 flex flex-col border-r border-slate-900">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <TrendingUp className="text-white w-5 h-5" />
        </div>
        <span className="text-white font-bold text-xl tracking-tight">BizFlow</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
              isActive 
                ? 'bg-blue-600/10 text-blue-400 font-medium' 
                : 'hover:text-white hover:bg-slate-900'
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
            {item.path === '/dashboard' && (
              <motion.div 
                layoutId="active-indicator"
                className="ml-auto"
              />
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-900">
        <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-slate-900/50 mb-4">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
            <span className="text-xs font-bold text-white uppercase">{user?.name.substring(0, 2)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-white truncate">{user?.name}</p>
            <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:text-white hover:bg-slate-900 transition-colors text-sm"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
