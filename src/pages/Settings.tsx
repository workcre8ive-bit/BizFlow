import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Building, 
  Bell, 
  Moon, 
  Sun, 
  Shield, 
  CreditCard,
  CheckCircle2,
  Camera
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card, Button, Input } from '../components/ui/Base';
import { cn } from '../lib/utils';

export default function Settings() {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'business', label: 'Business', icon: Building },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm">Manage your account and platform preferences.</p>
      </div>

      <div className="flex border-b border-slate-200 gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "pb-4 text-sm font-medium transition-all relative",
              activeTab === tab.id ? "text-blue-600" : "text-slate-500 hover:text-slate-700"
            )}
          >
            <div className="flex items-center gap-2">
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </div>
            {activeTab === tab.id && (
              <motion.div layoutId="setting-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8">
        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <Card>
              <h3 className="font-bold text-slate-900 mb-6">Profile Information</h3>
              <div className="flex flex-col md:flex-row gap-10">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-3xl bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-200">
                      <User className="w-12 h-12 text-slate-300" />
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-3 bg-blue-600 text-white rounded-2xl shadow-lg hover:scale-110 transition-transform">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest text-center">Square Jpeg or Png<br />Max 2MB</p>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase">First Name</label>
                      <Input defaultValue="Business" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase">Last Name</label>
                      <Input defaultValue="Owner" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase">Email Address</label>
                    <Input defaultValue={user?.email} />
                  </div>
                  <div className="pt-4">
                    <Button>Update Profile</Button>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900">Appearance Mode</h3>
                  <p className="text-sm text-slate-500">Toggle between light and dark visual themes.</p>
                </div>
                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={cn(
                    "w-14 h-8 rounded-full p-1 transition-colors relative",
                    isDarkMode ? "bg-slate-900" : "bg-slate-200"
                  )}
                >
                  <motion.div 
                    animate={{ x: isDarkMode ? 24 : 0 }}
                    className="w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center"
                  >
                    {isDarkMode ? <Moon className="w-3 h-3 text-slate-900" /> : <Sun className="w-3 h-3 text-orange-500" />}
                  </motion.div>
                </button>
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'business' && (
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
            <Card className="space-y-6">
              <h3 className="font-bold text-slate-900">Business Registry</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase">Business Name</label>
                  <Input defaultValue="BizFlow Ventures LLC" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase">Tax ID / EIN</label>
                  <Input defaultValue="XX-XXXXXXX" />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase">Physical Address</label>
                  <Input defaultValue="123 Startup Ave, Silicon Valley, CA 94025" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase">Currency</label>
                  <select className="w-full h-10 rounded-lg border border-slate-200 px-3 py-2 text-sm">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase">Timezone</label>
                  <select className="w-full h-10 rounded-lg border border-slate-200 px-3 py-2 text-sm">
                    <option>(GMT-08:00) Pacific Time</option>
                    <option>(GMT-05:00) Eastern Time</option>
                  </select>
                </div>
              </div>
              <div className="pt-4">
                <Button>Save Changes</Button>
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'notifications' && (
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <Card>
              <h3 className="font-bold text-slate-900 mb-6">Email Preferences</h3>
              <div className="space-y-4">
                {[
                  { label: 'New Invoice Payment', desc: 'Notify me when a client pays an invoice.' },
                  { label: 'Upcoming Appointments', desc: 'Send daily reminders of my schedule.' },
                  { label: 'Task Overdue', desc: 'Alert me when a high-priority task passes its deadline.' }
                ].map((pref, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{pref.label}</p>
                      <p className="text-xs text-slate-500">{pref.desc}</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-blue-600" />
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'security' && (
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <Card>
              <h3 className="font-bold text-slate-900 mb-6">Change Password</h3>
              <form className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase">Current Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase">New Password</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase">Confirm New Password</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                </div>
                <div className="pt-2">
                  <Button variant="secondary">Update Password</Button>
                </div>
              </form>
            </Card>

            <Card>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-slate-900">Two-Factor Authentication</h3>
                  <p className="text-sm text-slate-500">Add an extra layer of security to your account.</p>
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase",
                  "bg-orange-50 text-orange-600"
                )}>
                  Recommended
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-6">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-200">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">Authenticator App</p>
                  <p className="text-xs text-slate-500">Use apps like Google Authenticator or 1Password.</p>
                </div>
                <Button size="sm" variant="outline">Setup</Button>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <p className="text-xs text-slate-400 font-medium italic">Last login from SF, California (IP: 192.168.1.1)</p>
                <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">Log out of all devices</Button>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
