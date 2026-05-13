import React from 'react';
import { motion } from 'motion/react';
import { 
  DollarSign, 
  Users, 
  FileText, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  Clock
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useApp } from '../context/AppContext';
import { Card, Button } from '../components/ui/Base';
import { cn, formatCurrency } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { format, subMonths, isWithinInterval, startOfMonth, endOfMonth } from 'date-fns';

export default function Dashboard() {
  const { customers, invoices, appointments, tasks } = useApp();
  const navigate = useNavigate();

  // Generate real chart data from invoices for the last 6 months
  const chartData = Array.from({ length: 6 }).map((_, i) => {
    const monthDate = subMonths(new Date(), 5 - i);
    const monthName = format(monthDate, 'MMM');
    const monthlyRevenue = invoices
      .filter(inv => {
        const invDate = new Date(inv.createdAt);
        return inv.status === 'paid' && 
               isWithinInterval(invDate, { 
                 start: startOfMonth(monthDate), 
                 end: endOfMonth(monthDate) 
               });
      })
      .reduce((sum, inv) => sum + inv.amount, 0);

    return { name: monthName, revenue: monthlyRevenue };
  }).reverse();

  // Sort activities by date (descending)
  const recentInvoices = [...invoices].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);

  const priorityTasks = [...tasks]
    .filter(t => !t.completed)
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority as keyof typeof priorityOrder] - 
             priorityOrder[b.priority as keyof typeof priorityOrder];
    })
    .slice(0, 4);

  const totalRevenue = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const pendingInvoices = invoices.filter(inv => inv.status !== 'paid').length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;

  const stats = [
    { label: 'Total Revenue', value: formatCurrency(totalRevenue), icon: DollarSign, trend: 'Net Profit', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Pending Invoices', value: pendingInvoices, icon: FileText, trend: `${invoices.filter(i => i.status === 'unpaid').length} Overdue`, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Customers', value: activeCustomers, icon: Users, trend: `${customers.length} Total`, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Appointments', value: appointments.length, icon: Calendar, trend: 'Updated', color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Good Morning, Partner</h1>
          <p className="text-slate-500 text-sm">Here's what's happening with your business today.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/appointments')}>
            <Calendar className="w-4 h-4 mr-2" />
            Schedule
          </Button>
          <Button onClick={() => navigate('/invoices')}>
            <Plus className="w-4 h-4 mr-2" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className={cn("p-2 rounded-lg", stat.bg)}>
                  <stat.icon className={cn("w-5 h-5", stat.color)} />
                </div>
                <span className="text-xs font-medium text-slate-400">{stat.trend}</span>
              </div>
              <div className="mt-4">
                <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900">Revenue Over Time</h3>
            <select className="text-sm border-none bg-slate-50 rounded-lg px-2 py-1 outline-none">
              <option>Last 6 months</option>
              <option>Year to date</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                  tickFormatter={(v) => `$${v}`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Task Quick List */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900">Priority Tasks</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/tasks')}>View All</Button>
          </div>
          <div className="space-y-4">
            {priorityTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-4 group">
                <div className={cn(
                  "w-2 h-10 rounded-full",
                  task.priority === 'high' ? 'bg-red-500' : 'bg-blue-500'
                )} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-slate-900 truncate">{task.title}</p>
                  <div className="flex items-center text-[10px] text-slate-500 gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    <span>Due {task.deadline}</span>
                  </div>
                </div>
              </div>
            ))}
            {priorityTasks.length === 0 && (
              <div className="text-center py-8">
                <p className="text-sm text-slate-400">All caught up!</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <h3 className="font-bold text-slate-900 mb-6">Recent Activity</h3>
        <div className="space-y-6">
          {recentInvoices.map((inv) => (
            <div key={inv.id} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                <FileText className="w-5 h-5 text-slate-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-900">
                  <span className="font-semibold">{inv.status === 'paid' ? 'Payment received' : 'New invoice created'}</span> for {formatCurrency(inv.amount)}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{inv.createdAt}</p>
              </div>
              <div className={cn(
                "px-2 py-1 rounded text-[10px] font-bold uppercase",
                inv.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
              )}>
                {inv.status}
              </div>
            </div>
          ))}
          {recentInvoices.length === 0 && (
            <p className="text-sm text-slate-400 text-center py-4">No recent activity found.</p>
          )}
        </div>
      </Card>
    </div>
  );
}
