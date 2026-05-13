import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Calendar, 
  CheckSquare, 
  Settings, 
  LogOut,
  TrendingUp,
  ChevronLeft,
  Menu
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { logout, user } = useApp();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

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
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside 
        initial={false}
        animate={{ 
          width: isCollapsed ? 80 : 256,
          x: typeof window !== 'undefined' && window.innerWidth < 1024 ? (isOpen ? 0 : -256) : 0
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={cn(
          "bg-slate-950 text-slate-400 h-screen sticky top-0 flex flex-col border-r border-slate-900 z-50 overflow-hidden",
          "fixed lg:sticky"
        )}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="min-w-[32px] w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
              <TrendingUp className="text-white w-5 h-5" />
            </div>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white font-bold text-xl tracking-tight whitespace-nowrap"
              >
                BizFlow
              </motion.span>
            )}
          </div>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:block p-1 hover:bg-slate-900 rounded-md text-slate-500 transition-colors"
          >
            {isCollapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1 hover:bg-slate-900 rounded-md text-slate-500 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 1024) setIsOpen(false);
              }}
              className={({ isActive }) => cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
                isActive 
                  ? 'bg-blue-600/10 text-blue-400 font-medium' 
                  : 'hover:text-white hover:bg-slate-900'
              )}
              title={isCollapsed ? item.label : ''}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!isCollapsed && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {item.label}
                </motion.span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-slate-900">
          {!isCollapsed ? (
            <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-slate-900/50 mb-4 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 shrink-0">
                <span className="text-xs font-bold text-white uppercase">{user?.name.substring(0, 2)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate">{user?.name}</p>
                <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 mx-auto mb-4">
              <span className="text-xs font-bold text-white uppercase">{user?.name.substring(0, 2)}</span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg hover:text-white hover:bg-slate-900 transition-colors text-sm w-full",
              isCollapsed && "justify-center"
            )}
            title="Sign Out"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
};
